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

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CdkDrag, CdkDropList, CommonModule, MatButtonModule, RouterModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  layout = inject(LayoutService);

  list = signal<any[]>([]);

  app = inject(AppService);

  identity = inject(IdentityService);

  route = inject(ActivatedRoute);

  selectedList = signal<string | null>(null);

  constructor() {
    this.layout.marginOn();

    this.layout.resetActions();

    effect(async () => {
      if (this.app.initialized()) {
        await this.load();
      }
    });

    this.route.paramMap.subscribe((params) => {
      this.layout.disableScrolling();
      this.selectedList.set(params.get('id'));
    });
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
      const list = { record, data, id: record.id };

      this.list.update((requests) => [...requests, list]);
    }
  }

  async newTodo() {
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
