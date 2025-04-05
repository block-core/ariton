// src/app/components/queue-editor/queue-editor.component.ts
import { Component } from '@angular/core';
import { MediaQueueService, MediaItem } from '../../../../media-queue.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-queue-editor',
    imports: [
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
    ],
    templateUrl: './queue-editor.component.html'
})
export class QueueEditorComponent {
  newItemTitle: string = '';
  newItemType: 'music' | 'podcast' | 'video' = 'music';
  queue: MediaItem[] = [];

  constructor(private mediaQueueService: MediaQueueService) {
    this.mediaQueueService.queue$.subscribe((queue) => {
      this.queue = queue;
    });
  }

  addItem() {
    const newItem: MediaItem = {
      id: Date.now(),
      title: this.newItemTitle,
      type: this.newItemType,
    };
    this.mediaQueueService.addToQueue(newItem);
    this.newItemTitle = '';
  }

  removeItem(itemId: number) {
    this.mediaQueueService.removeFromQueue(itemId);
  }
}
