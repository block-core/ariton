import { effect, inject, Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  identity = inject(IdentityService);

  app = inject(AppService);

  constructor() {
    effect(async () => {
      if (this.app.initialized()) {
        await this.initialize();
      }
    });
  }

  async initialize() {
    // this.identity.activeAgent().identity.
  }
}
