import { Component, effect, inject, signal } from '@angular/core';
import { RequestComponent } from '../connections/request.component';
import { ConnectionComponent } from '../connections/connection.component';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';
import { AgoPipe } from '../../shared/pipes/ago.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AppService } from '../../app.service';
import { IdentityService } from '../../identity.service';
import { RecordEntry } from '../../data';
import { protocolDefinition as taskDefinition } from '../../../protocols/task';

export interface RoleData {
  // did?: string;
  // title?: string;
  // app: string;
  // recordId?: string;
  // vc?: string;
}

export interface RoleEntry extends RecordEntry<RoleData> {}

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    RequestComponent,
    ConnectionComponent,
    ProfileHeaderComponent,
    AgoPipe,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  app = inject(AppService);

  identity = inject(IdentityService);

  roles = signal<any[]>([]);

  constructor() {
    effect(async () => {
      if (this.app.initialized()) {
        await this.loadRoles();
      }
    });
  }

  async loadRoles() {
    const list: RoleEntry[] = [];

    const { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          tags: {
            role: true,
          },
        },
      },
    });

    for (let record of records!) {
      const data = await record.data.json();
      let notifiationEvent: RoleEntry = { record, data, id: record.id };
      list.push(notifiationEvent);
    }

    console.log(list);

    this.roles.set(list);

    return list;
  }

  async assignRole() {
    const did = 'did:dht:9omof8aypjcx33rkuk9akug8j7sr4n7u4s69c1hxj8ocmwj8pf1y';

    const tags = {
      role: true,
    };

    const data = {};

    const { record, status } = await this.identity.web5.dwn.records.create({
      data: data,
      message: {
        tags: tags,
        recipient: did,
        protocol: taskDefinition.protocol,
        protocolPath: 'collaborator',
        schema: taskDefinition.types.collaborator.schema,
        dataFormat: taskDefinition.types.collaborator.dataFormats[0],
      },
    });

    record?.send(did);

    console.log('Status:', status);
    console.log('Record:', record);
  }
}
