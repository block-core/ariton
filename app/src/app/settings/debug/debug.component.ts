import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IdentityService } from '../../identity.service';

@Component({
  selector: 'app-debug',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './debug.component.html',
  styleUrl: './debug.component.scss',
})
export class DebugComponent {
  query: string = `{
      "data": {},
      "message": {
        "tags": { "role": true },
        "recipient": "did:dht:9omof8aypjcx33rkuk9akug8j7sr4n7u4s69c1hxj8ocmwj8pf1y",
        "protocol": "https://schema.ariton.app/note",
        "protocolPath": "collaborator",
        "schema": "https://schema.ariton.app/note/schema/collaborator",
        "dataFormat": "application/json"
      }
    }`;

  result: string = '';

  status: string = '';

  identity = inject(IdentityService);

  async dwnRead() {
    console.log('this.query:', this.query);
    const request = JSON.parse(this.query);
    console.log('Request:', request);

    const { records, status } = await this.identity.web5.dwn.records.query(request);

    console.log('Status:', status);
    console.log('Records:', records);

    this.status = `${status.code}: ${status.detail}`;
    this.result = JSON.stringify(records, null, 2);
  }

  async dwnQuery() {
    console.log('this.query:', this.query);
    const request = JSON.parse(this.query);
    console.log('Request:', request);

    const { records, status } = await this.identity.web5.dwn.records.query(request);

    console.log('Status:', status);
    console.log('Records:', records);

    this.status = `${status.code}: ${status.detail}`;
    this.result = JSON.stringify(records, null, 2);
  }

  async dwnWrite() {
    console.log('this.query:', this.query);
    const request = JSON.parse(this.query);
    console.log('Request:', request);

    const { record, status } = await this.identity.web5.dwn.records.create(request);

    console.log('Status:', status);
    console.log('Record:', record);

    this.status = `${status.code}: ${status.detail}`;
    this.result = JSON.stringify(record, null, 2);
  }
}
