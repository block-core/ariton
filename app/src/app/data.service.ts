import { effect, inject, Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { AppService } from './app.service';
import { protocolDefinition as dataDefinition } from '../protocols/data';
import { StorageQueryConfiguration, StorageService } from './storage.service';
import { Record } from '@web5/api';

/** Generic Data Service that uses the generic Data protocl. Used for drafts, temporary documents, etc. Tags are used to filter. */
@Injectable({
  providedIn: 'root',
})
export class DataService {
  app = inject(AppService);

  configuration: StorageQueryConfiguration = {
    protocol: dataDefinition.protocol,
    protocolPath: 'data',
    schema: dataDefinition.types.data.schema,
    dataFormat: dataDefinition.types.data.dataFormats[0],
  };

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

  async save(data: any, tags: any, published = false) {
    return this.app.storage.save(this.configuration, data, tags, published);
  }

  async load(tags: any) {
    return this.app.storage.load(this.configuration, tags);
  }

  async get(recordId: string) {
    return this.app.storage.get(recordId);
  }

  async update(record: Record, data: any, tags: any, published = false) {
    return this.app.storage.update(record, data, tags, published);
  }

  async delete(record: Record) {
    return this.app.storage.delete(record);
  }
}
