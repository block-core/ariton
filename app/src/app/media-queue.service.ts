// src/app/services/media-queue.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MediaItem {
  id: number;
  title: string;
  type: 'music' | 'podcast' | 'video';
}

@Injectable({
  providedIn: 'root',
})
export class MediaQueueService {
  private queue: MediaItem[] = [];
  private queueSubject = new BehaviorSubject<MediaItem[]>(this.queue);

  queue$ = this.queueSubject.asObservable();

  addToQueue(item: MediaItem) {
    this.queue.push(item);
    this.queueSubject.next(this.queue);
  }

  removeFromQueue(itemId: number) {
    this.queue = this.queue.filter((item) => item.id !== itemId);
    this.queueSubject.next(this.queue);
  }

  clearQueue() {
    this.queue = [];
    this.queueSubject.next(this.queue);
  }
}
