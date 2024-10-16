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
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
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
  async getList(list: any) {
    // Fetch tasks under list

    console.log('GET LIST: ', list.record.creator);

    // const { records, status: status2 } = await this.identity.web5.dwn.records.query({
    //   from: entry.data.did,
    //   message: {
    //     protocolRole: 'list/collaborator',
    //     filter: {
    //       contextId: record.contextId,
    //       protocol: taskDefinition.protocol,
    //       protocolPath: 'list/task',
    //     },
    //   },
    // });

    const query: any = {
      // from: list.record.creator,
      message: {
        // protocolRole: 'list/collaborator',
        filter: {
          contextId: list.id,
          protocol: taskDefinition.protocol,
          protocolPath: 'list/task',
        },
      },
    };

    if (list.record.creator != this.identity.did) {
      query.from = list.record.creator;
      query.message.protocolRole = 'list/collaborator';
    } else {
      query.from = this.identity.did;
    }

    const { records: todoRecords } = await this.identity.web5.dwn.records.query(query);

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

  async reloadList(list: any) {
    const query = {
      from: list.record.creator,
      message: {
        protocolRole: 'list/collaborator',
        filter: {
          protocolPath: 'list',
          recordId: list.record.id,
        },
      },
    };

    const { record, status } = await this.identity.web5.dwn.records.read(query);

    const data = await record.data.json();

    list = { record, data, id: record.id };
    list.todos = await this.getList(list);

    const index = this.list.findIndex((item) => item.id === list.id);

    if (index !== -1) {
      this.list[index] = list;
    } else {
      this.list.push(list);
    }
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

      list.todos = await this.getList(list);

      this.list.push(list);
    }

    const shared = this.list.filter((l) => l.record.author != this.identity.did);

    console.log('SHARED LISTS:', shared);

    // If this is a shared list, we need to query remotely for updates.
    for (let list of shared) {
      console.log('LIST:', list);
      console.log('FROM:', list.record.creator);
      console.log('RECORD:', list.record.id);
      console.log('RECORD:', list.data.recordId);

      const query = {
        from: list.record.creator,
        message: {
          protocolRole: 'list/collaborator',
          filter: {
            protocolPath: 'list',
            recordId: list.record.id,
          },
        },
      };

      const { record, status } = await this.identity.web5.dwn.records.read(query);

      if (record.dateModified != list.record.dateModified) {
        const data = await record.data.json();

        let list: any = { record, data, id: record.id };
        list.todos = await this.getList(list);

        const index = this.list.findIndex((item) => item.id === list.id);

        if (index !== -1) {
          this.list[index] = list;
        } else {
          this.list.push(list);
        }

        // Import the updated record.
        try {
          await record.import();
        } catch (err) {
          console.error('Import error, this is expected 😂🤣🥲 until SDK is updated:', err);
        }
      } else {
        console.log('NO UPDATE, RECORD IS NOT MODIFIED!!');
      }
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
        // await this.assignRoleToList(list.record, list.data, newCollaborators);
        await this.sendConnectRequests(list.record, list.data, newCollaborators);
        // await this.sendToCollaborators(list.record, originalCollaboratorsList);
        // await this.sendToCollaborators(list.record, newCollaborators, true);

        this.app.openSnackBar('Sent sharing request to collaborators');
      }
    });

    return dialogRef.afterClosed();
  }

  // async assignRoleToList(record: Record, recordData: any, collaborators: string[]) {
  //   for (let collaborator of collaborators) {
  //     // Assign collaborator role to the DID.
  //     const tags = {
  //       role: true,
  //     };

  //     // This will fail if the DID already have a role assigned.
  //     // TODO: Implement a query to see if the user already has role assigned and skip this step.
  //     const { record: roleRecord, status: roleStatus } = await this.identity.web5.dwn.records.create({
  //       data: {},
  //       message: {
  //         tags: tags,
  //         recipient: collaborator,
  //         protocol: taskDefinition.protocol,
  //         protocolPath: 'collaborator',
  //         schema: taskDefinition.types.collaborator.schema,
  //         dataFormat: taskDefinition.types.collaborator.dataFormats[0],
  //       },
  //     });

  //     console.log('Role status:', roleStatus);
  //     console.log('Role record:', roleRecord);

  //     // Only send the role record to SELF, this should not be shared with the collaborator.
  //     await roleRecord?.send(this.identity.did);

  //     const data = {
  //       recordId: record.id,
  //       app: 'tasks',
  //       title: recordData.title,
  //     };

  //     // Create a connection request to the collaborator.
  //     const entry = await this.connection.request(collaborator, data, ConnectionType.Data);

  //     // Send the connection request to the collaborator.
  //     await entry.record.send(collaborator);

  //     // const { status } = await record.send(collaborator);
  //     // console.log('Send record to collaborator:', status, record);

  //     // if (status.code !== 202) {
  //     //   this.snackBar.open(`Code: ${status.code}, Error: ${status.detail}`, 'Close', {
  //     //     duration: 3000,
  //     //   });
  //   }
  // }

  async sendConnectRequests(record: Record, recordData: any, collaborators: string[]) {
    for (let collaborator of collaborators) {
      // Assign collaborator role to the DID.
      const tags = {
        role: true,
      };

      const query = {
        data: {},
        message: {
          tags: tags,
          recipient: collaborator,
          protocol: taskDefinition.protocol,
          parentContextId: record.contextId, // Make the role a child of the list.
          // protocolPath: 'list/collaborator',
          protocolPath: 'list/collaborator',
          schema: taskDefinition.types.collaborator.schema,
          // dataFormat: taskDefinition.types.collaborator.dataFormats[0],
        },
      };

      console.log('QUERY:', query);

      // This will fail if the DID already have a role assigned.
      // TODO: Implement a query to see if the user already has role assigned and skip this step.
      const { record: roleRecord, status: roleStatus } = await this.identity.web5.dwn.records.create(query);

      console.log('!!!!!');
      console.log('Role status:', roleStatus);
      console.log('Role record:', roleRecord);

      // const { record: roleRecord2, status: roleStatus2 } = await this.identity.web5.dwn.records.create({
      //   data: {},
      //   message: {
      //     tags: tags,
      //     recipient: collaborator,
      //     protocol: taskDefinition.protocol,
      //     protocolPath: 'collaborator',
      //     schema: taskDefinition.types.collaborator.schema,
      //     dataFormat: taskDefinition.types.collaborator.dataFormats[0],
      //   },
      // });

      // console.log('!!!!!');
      // console.log('Role status2:', roleStatus2);
      // console.log('Role record2:', roleRecord2);

      // Only send the role record to SELF, this should not be shared with the collaborator.
      await roleRecord?.send(this.identity.did);

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

  // async sendToCollaborators(record: Record, collaborators: string[], everything: boolean = false) {
  //   for (let collaborator of collaborators) {
  //     const { status } = await record.send(collaborator);
  //     console.log('Send record to collaborator:', status, record);

  //     if (status.code !== 202) {
  //       this.snackBar.open(`Code: ${status.code}, Error: ${status.detail}`, 'Close', {
  //         duration: 3000,
  //       });
  //     }
  //   }

  //   if (everything) {
  //     const tasks = await this.getList(record.id);

  //     for (let collaborator of collaborators) {
  //       for (let task of tasks) {
  //         const { status } = await task.record.send(collaborator);
  //         console.log('Send task to collaborator:', status);

  //         if (status.code !== 202) {
  //           this.snackBar.open(`Code: ${status.code}, Error: ${status.detail}`, 'Close', {
  //             duration: 3000,
  //           });
  //         }
  //       }
  //       // const { status } = await record.send(collaborator);
  //       // console.log('Send status to collaborator:', status);
  //     }
  //   }
  // }

  editList(list: any) {
    list.editing = true;
  }

  async saveList(list: any) {
    list.editing = false;

    const { status } = await list.record.update({
      data: list.data,
    });

    console.log('Update status:', status);

    const { status: status2 } = await list.record.send();

    console.log('SEND STATUS TO SELF:', status2);

    // Send to all collaborators.
    // await this.sendToCollaborators(list.record, list.data.collaborators);
  }

  editTask(todo: any) {
    todo.editing = true;
  }

  async saveTask(todo: any, list: any) {
    todo.editing = false;

    const query: any = {
      data: todo.data,
    };

    // Make sure we specify the protocolRole for the update, so that .send works.
    if (todo.record.creator != this.identity.did) {
      // query.protocolRole = 'list/collaborator';
    }

    const { status } = await todo.record.update(query);

    console.log('Update status:', status);

    const { status: status2 } = await todo.record.send();

    console.log('Send status 2: ', status2);

    // If the task is shared, send it back to creator.
    // if (todo.record.creator != this.identity.did) {
    //   console.log('SENDING TASK TO CREATOR:', todo.record.creator);
    //   const { status } = await todo.record.send(todo.record.creator);
    //   console.log('UPDATE STATUS:', status);
    // }

    // Send to all collaborators.
    // await this.sendToCollaborators(todo.record, list.data.collaborators);
  }

  async deleteList(list: any) {
    await list.record.delete({ prune: true });
    this.list = this.list.filter((l) => l.id !== list.id);
  }

  async deleteTask(record: Record, list: any) {
    await record.delete();
    list.todos = list.todos.filter((t: any) => t.id !== record.id);

    const { status } = await record.send();

    console.log('SEND STATUS OF DELETE:', status);

    // Send the delete to the creator.
    // if (record.creator != this.identity.did) {
    //   await record.send(record.creator);
    // }

    // await this.sendToCollaborators(record, list.data.collaborators);
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
        protocolRole: 'collaborator',
        schema: taskDefinition.types.task.schema,
        dataFormat: taskDefinition.types.task.dataFormats[0],
        parentContextId: taskData.parentId,
      },
    });

    // todoRecord?.update({ protocolRole: 'list/collaborator' });

    console.log('VALIDATE collaborator:', todoRecord);

    // const data = await todoRecord!.data.json();
    const todoEntry = await this.getTaskEntryFromRecord(todoRecord!);

    list.todos.push(todoEntry);
    console.log(list);

    this.changeRef.markForCheck();

    // await this.sendToCollaborators(todoRecord!, list.data.collaborators);
  }

  async loadRoles() {
    this.list = [];

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        // protocolRole: 'list',
        filter: {
          // tags: { role: true },
          protocol: taskDefinition.protocol,
          // schema: taskDefinition.types.list.schema,
          protocolPath: 'list/collaborator',
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    // const { record, status } = await this.identity.web5.dwn.records.read({
    //   from: entry.data.did,
    //   message: {
    //     protocolRole: 'collaborator',
    //     filter: {
    //       protocolPath: 'list',
    //       recordId: entry.data.recordId,
    //     },
    //   },
    // });

    console.log('ROLE RECORDS: ', records);

    // for (let record of records!) {
    //   const data = await record.data.json();
    //   let list: any = { record, data, id: record.id };

    //   list.todos = await this.getList(list.id);

    //   this.list.push(list);
    // }
  }

  async loadRemote() {
    this.list = [];

    // PAGING:
    // this.identity.web5.dwn.records.query({ message: { pagination } })

    const query = {
      from: 'did:dht:swboka9qm4ywhsoz19ja7gz9et9ccqhy8y88aikae1bwmfiuem3o',
      message: {
        // protocolRole: 'list/collaborator',
        filter: {
          // contextId: 'bafyreib3ivgo5vmt77w7cdg2kjyjbjfzdjw3so2yz7bd6redz7kfbsmvmi',
          protocol: taskDefinition.protocol,
          protocolPath: 'list',
          schema: taskDefinition.types.list.schema,
          dataFormat: taskDefinition.types.list.dataFormats[0],
          // protocolPath: 'list',
          // protocolPath: 'list/bafyreiduwnbofvuoqomjvwyphix6geuzhybsb7fhvn426pw5hp75zm4pki',
          // schema: taskDefinition.types.list.schema,
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    };

    console.log(query);

    const { records } = await this.identity.web5.dwn.records.query(query);

    const { record } = await this.identity.web5.dwn.records.read({
      from: 'did:dht:swboka9qm4ywhsoz19ja7gz9et9ccqhy8y88aikae1bwmfiuem3o',
      message: {
        protocolRole: 'list/collaborator',
        filter: {
          recordId: 'bafyreib3ivgo5vmt77w7cdg2kjyjbjfzdjw3so2yz7bd6redz7kfbsmvmi',
          protocol: taskDefinition.protocol,
        },
      },
    });

    console.log('SINGLE RECORD:', record);

    const json = await record.data.json();
    console.log('SINGLE JSON:', json);

    // const { record, status } = await this.identity.web5.dwn.records.read({
    //   from: entry.data.did,
    //   message: {
    //     protocolRole: 'collaborator',
    //     filter: {
    //       protocolPath: 'list',
    //       recordId: entry.data.recordId,
    //     },
    //   },
    // });

    console.log('REMOTE RECORDS: ', records);

    for (let record of records!) {
      const data = await record.data.json();

      console.log('REMOTE RECORD DATA:', data);

      // let list: any = { record, data, id: record.id };

      // list.todos = await this.getList(list.id);

      // this.list.push(list);
    }
  }

  async createTests() {
    const sharedListData = {
      type: 'list',
      title: 'New list',
      description: 'What to do?',
      author: this.identity.did,
      collaborators: [],
    };

    const { record: record1, status: status1 } = await this.identity.web5.dwn.records.create({
      data: sharedListData,
      message: {
        // recipient: 'did:dht:4jt77q3d3sjndj9drdxtdppjqegmu8zaxo8ktw8xwr5ecrsn5mby',
        protocol: taskDefinition.protocol,
        protocolPath: 'list',
        // protocolRole: 'list/collaborator',
        schema: taskDefinition.types.list.schema,
        dataFormat: taskDefinition.types.list.dataFormats[0],
      },
    });

    console.log('STATUS: ', status1);
    record1?.send(this.identity.did);

    // Create two role records, one with parentContext and one without.
    const tags = {
      role: true,
    };

    const query: any = {
      data: {},
      message: {
        tags: tags,
        recipient: 'did:dht:4jt77q3d3sjndj9drdxtdppjqegmu8zaxo8ktw8xwr5ecrsn5mby',
        protocol: taskDefinition.protocol,
        parentContextId: record1!.contextId,
        protocolPath: 'list/collaborator',
        schema: taskDefinition.types.collaborator.schema,
      },
    };

    console.log('QUERY:', query);

    const { record: roleRecord, status: roleStatus } = await this.identity.web5.dwn.records.create(query);
    console.log('ROLE STATUS:', roleStatus);
    roleRecord?.send(this.identity.did);
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
        // published: true,
        protocol: taskDefinition.protocol,
        protocolPath: 'list',
        protocolRole: 'list/collaborator',
        // protocolRole: 'collaborator',
        schema: taskDefinition.types.list.schema,
        dataFormat: taskDefinition.types.list.dataFormats[0],
      },
    });

    console.log('VALIDATE collaborator:', record);

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

    if (data.todos === undefined) {
      data.todos = [];
    }

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
      // await this.sendToCollaborators(todoRecord!, entry.data.collaborators);

      // Delete the old record.
      await entry.record.delete();
      // await this.sendToCollaborators(entry.record, entry.data.collaborators);

      // Replace reference to the record with the new one.
      entry.record = todoRecord;
      entry.id = todoRecord?.id;

      entry.loading = false;
    }
  }
}
