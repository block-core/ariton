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
import { protocolDefinition as todoDefinition } from '../../../../protocols/todo';
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

  route = inject(ActivatedRoute);

  changeRef = inject(ChangeDetectorRef);

  selectedList = signal<string | null>(null);

  selectedRecord = signal<Record | null>(null);

  constructor() {
    this.layout.marginOn();
    this.layout.resetActions();

    effect(
      async () => {
        if (this.app.initialized()) {
          await this.load();
        }
      },
      { allowSignalWrites: true },
    );

    this.route.paramMap.subscribe((params) => {
      // this.layout.marginOff();
      // this.layout.disableScrolling();
      const id = params.get('id');

      if (!id || id == ':id') {
        this.selectedList.set(null);
      } else {
        this.selectedList.set(params.get('id'));
      }
    });
  }

  async getList(id: string) {
    console.log('GET TODO FOR LIST:', id);

    // fetch shared list details
    // const { record } = await this.identity.web5.dwn.records.read({
    //   message: {
    //     filter: {
    //       recordId: id,
    //     },
    //   },
    // });

    // fetch todos under list
    const { records: todoRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          parentId: id,
        },
      },
    });

    let todos: any[] = [];

    // add entry to array
    for (let record of todoRecords!) {
      const todo = await this.getTodoEntryFromRecord(record);
      todos.push(todo);
    }

    // Ensure the array is sorted by the new indices
    todos = todos.sort((a, b) => a.data.index - b.data.index);

    return todos;
  }

  async getTodoEntryFromRecord(record: Record) {
    const data = await record.data.json();
    const todo = { record, data, id: record.id };
    return todo;
  }

  async load() {
    this.list = [];

    // Fetch shared todo lists
    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: todoDefinition.protocol,
          schema: todoDefinition.types.list.schema,
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    console.log('Saved records', records);

    // add entry to sharedList
    for (let record of records!) {
      const data = await record.data.json();
      let list: any = { record, data, id: record.id };

      // fetch todos under list
      list.todos = await this.getList(list.id);

      this.list.push(list);

      // this.list.update((requests) => [...requests, list]);
    }
  }

  editList(list: any) {
    list.editing = true;
  }

  async saveList(list: any) {
    list.editing = false;

    const { status, record } = await list.record.update({
      data: list.data,
    });

    console.log('Update status:', status);

    // TODO: Send to all collaborators.
    // record.send();
  }

  editTodo(todo: any) {
    todo.editing = true;
  }

  async saveTodo(todo: any) {
    todo.editing = false;

    const { status, record } = await todo.record.update({
      data: todo.data,
    });

    console.log('Update status:', status);
  }

  async deleteList(list: any) {
    await list.record.delete({ prune: true });
    this.list = this.list.filter((l) => l.id !== list.id);
  }

  async deleteTodo(record: Record, list: any) {
    await record.delete();
    list.todos = list.todos.filter((t: any) => t.id !== record.id);
  }

  initializeIndices(entries: any[]): void {
    entries.forEach((entry, i) => {
      entry.index = i + 1; // Start indices from 1 to avoid zero
    });
  }

  calculateNewIndex(previousIndex: number, nextIndex: number): number {
    return (previousIndex + nextIndex) / 2;
  }

  async addTodo(list: any) {
    // const todoRecipient = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    if (!list.todos) {
      list.todos = [];
    }

    const todoData = {
      completed: false,
      description: 'New todo...',
      author: this.identity.did,
      parentId: list.id,
      index: list.todos.length + 1, // Start indices from 1 to avoid zero
    };

    // newTodoDescription.value = '';

    const { record: todoRecord, status: createStatus } = await this.identity.web5.dwn.records.create({
      data: todoData,
      message: {
        protocol: todoDefinition.protocol,
        protocolPath: 'list/todo',
        schema: todoDefinition.types.todo.schema,
        dataFormat: todoDefinition.types.todo.dataFormats[0],
        parentContextId: todoData.parentId,
      },
    });

    const data = await todoRecord!.data.json();
    // const todo = { todoRecord, data, id: todoRecord!.id };

    // this.todos.update((requests) => [...requests, todo]);

    // TODO: Send to collaborators.
    // const { status: sendStatus } = await todoRecord!.send(todoRecipient);

    // if (sendStatus.code !== 202) {
    //   console.log('Unable to send to target did:' + sendStatus);
    //   // return;
    // } else {
    //   console.log('Sent todo to recipient');
    // }

    const todoEntry = await this.getTodoEntryFromRecord(todoRecord!);

    // const list = this.list.find((l) => l.id === listId);
    // console.log('LIST:', list);

    list.todos.push(todoEntry);
    console.log(list);

    this.changeRef.markForCheck();
  }

  async newList() {
    const recipientDID = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    const sharedListData = {
      type: 'list',
      title: 'New list',
      description: 'What to do?',
      author: this.identity.did,
      recipient: recipientDID,
    };

    const { record } = await this.identity.web5.dwn.records.create({
      data: sharedListData,
      message: {
        protocol: todoDefinition.protocol,
        protocolPath: 'list',
        schema: todoDefinition.types.list.schema,
        dataFormat: todoDefinition.types.list.dataFormats[0],
        recipient: recipientDID,
      },
    });

    const data = await record!.data.json();
    const list = { record, data, id: record!.id };

    this.list.push(list);
    // this.list.update((requests) => [...requests, list]);

    const { status: sendStatus } = await record!.send(recipientDID);
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
          protocol: todoDefinition.protocol,
          protocolPath: 'list/todo',
          schema: todoDefinition.types.todo.schema,
          dataFormat: todoDefinition.types.todo.dataFormats[0],
          parentContextId: entry.data.parentId,
        },
      });

      console.log('Create status:', createStatus);

      // TODO: Send the record to the recipients.

      // Delete the old record.
      await entry.record.delete();

      // Replace reference to the record with the new one.
      entry.record = todoRecord;
      entry.id = todoRecord?.id;

      entry.loading = false;

      // TODO: Send to all collaborators.
      // record.send();
    }
  }
}
