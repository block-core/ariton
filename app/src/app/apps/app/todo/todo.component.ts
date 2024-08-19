import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, effect, inject, signal } from '@angular/core';
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

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CommonModule, MatButtonModule, RouterModule, MatTabsModule, MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  layout = inject(LayoutService);

  list = signal<any[]>([]);

  todos = signal<any[]>([]);

  app = inject(AppService);

  identity = inject(IdentityService);

  route = inject(ActivatedRoute);

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
      this.layout.marginOff();
      // this.layout.disableScrolling();
      const id = params.get('id');

      if (!id || id == ':id') {
        this.selectedList.set(null);
      } else {
        this.selectedList.set(params.get('id'));
      }
    });

    effect(
      async () => {
        if (this.app.initialized() && this.selectedList()) {
          await this.loadList(this.selectedList()!);
        }
      },
      { allowSignalWrites: true },
    );
  }

  async loadList(id: string) {
    this.todos.set([]);

    // fetch shared list details
    const { record } = await this.identity.web5.dwn.records.read({
      message: {
        filter: {
          recordId: id,
        },
      },
    });

    this.selectedRecord.set(record);

    // fetch todos under list
    const { records: todoRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          parentId: id,
        },
      },
    });

    const todoList = await record.data.json();
    console.log(todoList);

    // add entry to array
    for (let record of todoRecords!) {
      const data = await record.data.json();
      const todo = { record, data, id: record.id };

      this.todos.update((requests) => [...requests, todo]);
    }
  }

  async getList(id: string) {
    console.log('GET LIST:', id);

    // fetch shared list details
    const { record } = await this.identity.web5.dwn.records.read({
      message: {
        filter: {
          recordId: id,
        },
      },
    });

    // fetch todos under list
    const { records: todoRecords } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          parentId: id,
        },
      },
    });

    const todoList = await record.data.json();

    const todos = [];

    // add entry to array
    for (let record of todoRecords!) {
      const data = await record.data.json();
      const todo = { record, data, id: record.id };
      todos.push(todo);
    }

    return todos;
  }

  async load() {
    // Fetch shared todo lists
    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
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

      this.list.update((requests) => [...requests, list]);
    }
  }

  async newTodo() {
    const todoRecipient = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    const todoData = {
      completed: false,
      description: 'description',
      author: this.identity.did,
      parentId: this.selectedRecord()!.id,
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
    const todo = { todoRecord, data, id: todoRecord!.id };

    this.todos.update((requests) => [...requests, todo]);

    const { status: sendStatus } = await todoRecord!.send(todoRecipient);

    if (sendStatus.code !== 202) {
      console.log('Unable to send to target did:' + sendStatus);
      return;
    } else {
      console.log('Sent todo to recipient');
    }
  }

  async newList() {
    const recipientDID = 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao';

    const sharedListData = {
      type: 'list',
      title: 'Hello',
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

    this.list.update((requests) => [...requests, list]);

    const { status: sendStatus } = await record!.send(recipientDID);
    console.log('Send status:', sendStatus);
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
