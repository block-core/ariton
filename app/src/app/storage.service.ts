import { effect, inject, Injectable } from '@angular/core';
import { LayoutService } from './layout.service';
import { IdentityService } from './identity.service';
import { AppService } from './app.service';
import { RecordEntry } from './data';
import { Record } from '@web5/api';

export interface StorageQueryConfiguration {
  protocol: string;
  protocolPath: string;
  schema: string;
  dataFormat: string;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  identity = inject(IdentityService);

  constructor() {}

  async save<T>(configuration: StorageQueryConfiguration, data: any, tags: any, published = false) {
    const { record, status } = await this.identity.web5.dwn.records.create({
      data: data,
      message: {
        published: published,
        tags: tags,
        protocol: configuration.protocol,
        protocolPath: configuration.protocolPath,
        schema: configuration.schema,
        dataFormat: configuration.dataFormat,
      },
    });

    if (status.code !== 202) {
      throw new Error(`Failed to save data (${status.code}): ${status.detail}`);
    }

    const entry: RecordEntry<T> = {
      data: data,
      id: record!.id,
      record: record!,
    };

    return entry;
  }

  async load<T>(configuration: StorageQueryConfiguration, tags: any) {
    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          tags: tags,
          protocol: configuration.protocol,
          schema: configuration.schema,
          dataFormat: configuration.dataFormat,
        },
      },
    });

    if (!records || records.length === 0) {
      return [];
    }

    const list = [];

    for (const record of records) {
      let data = await record.data.json();
      let json: RecordEntry<T> = { record: record, data: data, id: record.id };
      list.push(json);
    }

    return list;
  }

  async get<T>(recordId: string) {
    var { record, status } = await this.identity.web5.dwn.records.read({ message: { filter: { recordId } } });

    if (status.code !== 200) {
      throw new Error(`Failed to get data (${status.code}): ${status.detail}`);
    }

    const data = await record.data.json();

    const entry = {
      data,
      id: record.id,
      record,
    };

    return entry;
  }

  async update(record: Record, data: any, tags: any, published = false) {
    const { status } = await record.update({ published: published, data: data, tags: tags });

    if (status.code !== 202) {
      throw new Error(`Failed to save data (${status.code}): ${status.detail}`);
    }

    const entry = {
      data,
      id: record.id,
      record,
    };

    return entry;
  }

  async delete(record: Record) {
    const { status } = await record.delete();
    // const { status } = await this.identity.web5.dwn.records.delete({ message: { recordId } });

    if (status.code !== 202) {
      throw new Error(`Failed to delete data (${status.code}): ${status.detail}`);
    }
  }

  // // Save data to localStorage with prefix
  // save(key: string, value: any): void {
  //   localStorage.setItem(this.prefix + key, JSON.stringify(value));
  // }

  // // Read data from localStorage with prefix
  // read<T>(key: string): T | null {
  //   const item = localStorage.getItem(this.prefix + key);
  //   if (item) {
  //     return JSON.parse(item) as T;
  //   }
  //   return null;
  // }

  // // Remove data from localStorage with prefix
  // remove(key: string): void {
  //   localStorage.removeItem(this.prefix + key);
  // }

  // // Clear all data from localStorage that matches the prefix
  // clear(): void {
  //   Object.keys(localStorage).forEach((key) => {
  //     if (key.startsWith(this.prefix)) {
  //       localStorage.removeItem(key);
  //     }
  //   });
  // }
}
