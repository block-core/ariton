import { effect, inject, Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { AppService } from './app.service';
import { protocolDefinition as dataDefinition } from '../protocols/data';

/** Generic Data Service that uses the generic Data protocl. Used for drafts, temporary documents, etc. Tags are used to filter. */
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

  async save(data: any, tags: any) {
    const { record, status } = await this.identity.web5.dwn.records.create({
      data: data,
      message: {
        tags: tags,
        protocol: dataDefinition.protocol,
        protocolPath: 'data',
        schema: dataDefinition.types.data.schema,
        dataFormat: dataDefinition.types.data.dataFormats[0],
      },
    });

    return {
      data: data,
      id: record?.id,
      record: record,
    };
  }

  async load(tags: any) {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          tags: tags,
          protocol: dataDefinition.protocol,
          schema: dataDefinition.types.data.schema,
          dataFormat: dataDefinition.types.data.dataFormats[0],
        },
      },
    });

    if (!records || records.length === 0) {
      return [];
    }

    const list = [];

    for (const record of records) {
      let data = await record.data.json();
      let json: any = { record: record, data: data, id: record.id };
      list.push(json);
    }

    return list;
  }
}
