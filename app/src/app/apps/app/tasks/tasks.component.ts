import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { protocolDefinition as taskDefinition } from '../../../../protocols/task';
import { AppService } from '../../../app.service';
import { IdentityService } from '../../../identity.service';
import { DwnDateSort } from '@web5/agent';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Record } from '@web5/api';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CollaboratorDialogComponent } from './collaborator-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService, ConnectionType } from '../../../connection.service';
import { protocolDefinition as noteDefinition } from '../../../../protocols/note';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    CommonModule,
    MatButtonModule,
    RouterModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  list: any[] = [];

  layout = inject(LayoutService);

  app = inject(AppService);

  identity = inject(IdentityService);

  connection = inject(ConnectionService);

  route = inject(ActivatedRoute);

  changeRef = inject(ChangeDetectorRef);

  dialog = inject(MatDialog);

  snackBar = inject(MatSnackBar);

  selectedList = signal<string | null>(null);

  selectedRecord = signal<Record | null>(null);

  constructor() {
    effect(
      async () => {
        if (this.app.initialized()) {
          await this.load();
        }
      },
      { allowSignalWrites: true },
    );

    this.route.paramMap.subscribe((params) => {
      this.layout.marginOn();
      this.layout.resetActions();

      const id = params.get('id');

      if (!id || id == ':id' || id == 'home') {
        this.selectedList.set(null);
      } else {
        this.selectedList.set(params.get('id'));
      }
    });
  }

  /** Gets a list of tasks with the supplied parent id. */
  async getList(id: string) {
    // Fetch tasks under list
    const { records: todoRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          parentId: id,
        },
      },
    });

    let todos: any[] = [];

    for (let record of todoRecords!) {
      const todo = await this.getTaskEntryFromRecord(record);
      todos.push(todo);
    }

    // Ensure the array is sorted by the new indices
    todos = todos.sort((a, b) => a.data.index - b.data.index);

    console.log('ALL TODOS:', todos);

    return todos;
  }

  async getTaskEntryFromRecord(record: Record) {
    const data = await record.data.json();
    const todo = { record, data, id: record.id };
    return todo;
  }

  async load() {
    this.list = [];

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: taskDefinition.protocol,
          schema: taskDefinition.types.list.schema,
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    for (let record of records!) {
      const data = await record.data.json();
      let list: any = { record, data, id: record.id };

      list.todos = await this.getList(list.id);

      this.list.push(list);
    }
  }

  collaboratorDialog(list: any) {
    // let data: DialogData = {
    //   title: entry.data.title,
    //   body: entry.data.body,
    //   background: entry.data.background,
    //   collaborators: [],
    //   labels: [''],
    // };

    let data = {
      title: list.data.title,
      id: list.id,
      collaborators: list.data.collaborators,
    };

    if (data.collaborators == null) {
      data.collaborators = [];
    }

    const original = JSON.parse(JSON.stringify(data));

    const dialogRef = this.dialog.open(CollaboratorDialogComponent, {
      // maxWidth: '80vw',
      // maxHeight: '80vh',
      data: data,
    });

    dialogRef.afterClosed().subscribe(async (result: any) => {
      if (!result) {
        // Reset the original data if user cancels.
        data = original;
      } else {
        // Copy the collaborators.
        list.data.collaborators = data.collaborators;

        // Compute the difference between the original and new collaborators
        const originalCollaborators = new Set(original.collaborators);

        const newCollaborators = data.collaborators.filter(
          (collaborator: any) => !originalCollaborators.has(collaborator),
        );

        const originalCollaboratorsList = data.collaborators.filter((collaborator: any) =>
          originalCollaborators.has(collaborator),
        );

        const { status } = await list.record.update({ data: list.data });

        console.log('Save status for list:', status);
        console.log('New collaborators:', newCollaborators);
        console.log('Existing collaborators:', originalCollaboratorsList);

        // Send a connect request to all new collaborators. We won't be able to send them any data
        // unless they approve us.
        await this.sendConnectRequests(list.record, list.data, newCollaborators);
        await this.sendToCollaborators(list.record, originalCollaboratorsList);
        // await this.sendToCollaborators(list.record, newCollaborators, true);
      }
    });

    return dialogRef.afterClosed();
  }

  async sendConnectRequests(record: Record, recordData: any, collaborators: string[]) {
    for (let collaborator of collaborators) {
      // Assign collaborator role to the DID.
      const tags = {
        role: true,
      };

      // This will fail if the DID already have a role assigned.
      // TODO: Implement a query to see if the user already has role assigned and skip this step.
      const { record: roleRecord, status: roleStatus } = await this.identity.web5.dwn.records.create({
        data: {},
        message: {
          tags: tags,
          recipient: collaborator,
          protocol: noteDefinition.protocol,
          protocolPath: 'collaborator',
          schema: noteDefinition.types.collaborator.schema,
          dataFormat: noteDefinition.types.collaborator.dataFormats[0],
        },
      });

      console.log('Role status:', roleStatus);
      console.log('Role record:', roleRecord);

      record?.send(collaborator);

      const data = {
        recordId: record.id,
        app: 'tasks',
        title: recordData.title,
      };

      // Create a connection request to the collaborator.
      const entry = await this.connection.request(collaborator, data, ConnectionType.Data);

      // Send the connection request to the collaborator.
      await entry.record.send(collaborator);

      // const { status } = await record.send(collaborator);
      // console.log('Send record to collaborator:', status, record);

      // if (status.code !== 202) {
      //   this.snackBar.open(`Code: ${status.code}, Error: ${status.detail}`, 'Close', {
      //     duration: 3000,
      //   });
    }
  }

  async sendToCollaborators(record: Record, collaborators: string[], everything: boolean = false) {
    for (let collaborator of collaborators) {
      const { status } = await record.send(collaborator);
      console.log('Send record to collaborator:', status, record);

      if (status.code !== 202) {
        this.snackBar.open(`Code: ${status.code}, Error: ${status.detail}`, 'Close', {
          duration: 3000,
        });
      }
    }

    if (everything) {
      const tasks = await this.getList(record.id);

      for (let collaborator of collaborators) {
        for (let task of tasks) {
          const { status } = await task.record.send(collaborator);
          console.log('Send task to collaborator:', status);

          if (status.code !== 202) {
            this.snackBar.open(`Code: ${status.code}, Error: ${status.detail}`, 'Close', {
              duration: 3000,
            });
          }
        }
        // const { status } = await record.send(collaborator);
        // console.log('Send status to collaborator:', status);
      }
    }
  }

  editList(list: any) {
    list.editing = true;
  }

  async saveList(list: any) {
    list.editing = false;

    const { status } = await list.record.update({
      data: list.data,
    });

    console.log('Update status:', status);

    // Send to all collaborators.
    await this.sendToCollaborators(list.record, list.data.collaborators);
  }

  editTask(todo: any) {
    todo.editing = true;
  }

  async saveTask(todo: any, list: any) {
    todo.editing = false;

    const { status } = await todo.record.update({
      data: todo.data,
    });

    console.log('Update status:', status);

    // Send to all collaborators.
    await this.sendToCollaborators(todo.record, list.data.collaborators);
  }

  async deleteList(list: any) {
    await list.record.delete({ prune: true });
    this.list = this.list.filter((l) => l.id !== list.id);
  }

  async deleteTask(record: Record, list: any) {
    await record.delete();
    list.todos = list.todos.filter((t: any) => t.id !== record.id);

    await this.sendToCollaborators(record, list.data.collaborators);
  }

  initializeIndices(entries: any[]): void {
    entries.forEach((entry, i) => {
      entry.index = i + 1; // Start indices from 1 to avoid zero
    });
  }

  calculateNewIndex(previousIndex: number, nextIndex: number): number {
    return (previousIndex + nextIndex) / 2;
  }

  async addTask(list: any) {
    // const todoRecipient = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    if (!list.todos) {
      list.todos = [];
    }

    const taskData = {
      completed: false,
      description: 'New task...',
      author: this.identity.did,
      parentId: list.id,
      index: list.todos.length + 1, // Start indices from 1 to avoid zero
      collaborators: [],
    };

    // newTodoDescription.value = '';

    const { record: todoRecord, status: createStatus } = await this.identity.web5.dwn.records.create({
      data: taskData,
      message: {
        protocol: taskDefinition.protocol,
        protocolPath: 'list/task',
        schema: taskDefinition.types.task.schema,
        dataFormat: taskDefinition.types.task.dataFormats[0],
        parentContextId: taskData.parentId,
      },
    });

    // const data = await todoRecord!.data.json();
    const todoEntry = await this.getTaskEntryFromRecord(todoRecord!);

    list.todos.push(todoEntry);
    console.log(list);

    this.changeRef.markForCheck();

    await this.sendToCollaborators(todoRecord!, list.data.collaborators);
  }

  async newList() {
    // const recipientDID = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    const sharedListData = {
      type: 'list',
      title: 'New list',
      description: 'What to do?',
      author: this.identity.did,
      // recipient: recipientDID,
      collaborators: [],
    };

    const { record } = await this.identity.web5.dwn.records.create({
      data: sharedListData,
      message: {
        protocol: taskDefinition.protocol,
        protocolPath: 'list',
        schema: taskDefinition.types.list.schema,
        dataFormat: taskDefinition.types.list.dataFormats[0],
        // recipient: recipientDID,
      },
    });

    const data = await record!.data.json();
    const list = { record, data, id: record!.id };

    this.list.push(list);
    // this.list.update((requests) => [...requests, list]);

    const { status: sendStatus } = await record!.send(this.identity.did);
    console.log('Send status:', sendStatus);
  }

  async drop(event: CdkDragDrop<string[]>) {
    console.log('DROP:', event);

    const entry = event.item.data;

    entry.loading = true;

    const data = event.container.data as any;
    const array = data.todos;

    const previousData = event.previousContainer.data as any;
    const previousArray = previousData.todos;

    if (event.previousContainer === event.container) {
      moveItemInArray(array, event.previousIndex, event.currentIndex);

      const previousIndex = event.currentIndex > 0 ? array[event.currentIndex - 1].data.index : 0;
      const nextIndex =
        event.currentIndex < array.length - 1 ? array[event.currentIndex + 1].data.index : array.length + 1;

      entry.data.index = this.calculateNewIndex(previousIndex, nextIndex);

      console.log(previousIndex, nextIndex, entry.data.index);

      const { status } = await entry.record.update({
        data: entry.data,
      });

      console.log('Status:', status);

      entry.loading = false;
    } else {
      transferArrayItem(previousArray, array, event.previousIndex, event.currentIndex);

      // Set the new parentId, keep other values the same.
      entry.data.parentId = data.id;

      const previousIndex = event.currentIndex > 0 ? array[event.currentIndex - 1].data.index : 0;
      const nextIndex =
        event.currentIndex < array.length - 1 ? array[event.currentIndex + 1].data.index : array.length + 1;

      entry.data.index = this.calculateNewIndex(previousIndex, nextIndex);

      console.log(previousIndex, nextIndex, entry.data.index);

      // When moving across lists, we must create a new record and delete the old, as the parentId cannot be updated.
      const { record: todoRecord, status: createStatus } = await this.identity.web5.dwn.records.create({
        data: entry.data,
        message: {
          protocol: taskDefinition.protocol,
          protocolPath: 'list/task',
          schema: taskDefinition.types.task.schema,
          dataFormat: taskDefinition.types.task.dataFormats[0],
          parentContextId: entry.data.parentId,
        },
      });

      console.log('Create status:', createStatus);

      // Send the record to the recipients.
      await this.sendToCollaborators(todoRecord!, entry.data.collaborators);

      // Delete the old record.
      await entry.record.delete();
      await this.sendToCollaborators(entry.record, entry.data.collaborators);

      // Replace reference to the record with the new one.
      entry.record = todoRecord;
      entry.id = todoRecord?.id;

      entry.loading = false;
    }
  }
}
