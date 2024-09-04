import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({ providedIn: 'root' })
export class HandleUnrecoverableStateService {
  constructor(updates: SwUpdate) {
    updates.unrecoverable.subscribe((event) => {
      alert('An error occurred that we cannot recover from:\n' + event.reason + '\n\nPlease reload the page.');
    });
  }
}
