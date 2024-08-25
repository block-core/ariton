import { inject, Injectable } from '@angular/core';
import { IdentityService } from './identity.service';
import { protocolDefinition as notificationDefinition } from '../protocols/notification';
import { DwnDateSort } from '@web5/agent';
import { Record } from '@web5/api';

export interface NotificationEvent {
  record: Record;
  id: string;
  data: any;
  loading?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  identity = inject(IdentityService);

  constructor() {}

  async create(data: any) {
    const eventData = data;

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: eventData,
      message: {
        protocol: notificationDefinition.protocol,
        protocolPath: 'event',
        schema: notificationDefinition.types.event.schema,
        dataFormat: notificationDefinition.types.event.dataFormats[0],
      },
    });

    console.log('Notification created:', status, record);

    return {
      record,
      data: eventData,
      id: record!.id,
    } as NotificationEvent;
  }

  async load() {
    const list: NotificationEvent[] = [];

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: notificationDefinition.protocol,
          schema: notificationDefinition.types.event.schema,
        },
        dateSort: DwnDateSort.CreatedAscending,
      },
    });

    for (let record of records!) {
      const data = await record.data.json();
      let notifiationEvent: NotificationEvent = { record, data, id: record.id };
      list.push(notifiationEvent);
    }

    return list;
  }
}
