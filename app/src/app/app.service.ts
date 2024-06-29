import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  initialized = signal<boolean>(false);

  constructor() { }

  async initialize() {
    console.log('Initializing Ariton...');

    this.initialized.set(true);
  }
}
