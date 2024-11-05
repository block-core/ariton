// src/app/components/queue-editor/queue-editor.component.ts
import { Component } from '@angular/core';
import { MediaQueueService, MediaItem } from '../../../../media-queue.service';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-queue-editor',
  standalone: true,
  imports: [MatButtonModule, FormsModule],
  templateUrl: './queue-editor.component.html', // Reference to external template
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
