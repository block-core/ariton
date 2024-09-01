import { Component, effect, inject, Input, signal } from '@angular/core';
import { ConnectionEntry, ConnectionService } from '../../connection.service';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AgoPipe } from '../../shared/pipes/ago.pipe';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';
import { RecordEntry } from '../../data';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [ProfileHeaderComponent, AgoPipe, CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './request.component.html',
  styleUrl: './request.component.scss',
})
export class RequestComponent {
  @Input() public entry?: ConnectionEntry = undefined;

  connection = inject(ConnectionService);

  app = inject(AppService);

  constructor() {}

  deleteConnection(entry: any) {
    entry.loading = true;

    this.connection.deleteConnection(entry);

    // TODO: We should delete notifications related to this connection.
  }

  async accept(entry: any) {
    entry.loading = true;
    console.log('Accepting connection request', entry);

    const type = entry.record.tags.type;

    await this.connection.create(entry.data, type);

    // TODO: We should delete notifications related to this connection.
    // this.deleteNotification(entry);
  }

  async block(entry: any) {
    entry.loading = true;
    console.log('Blocking user', entry);

    const result = await this.connection.block(entry.record.author);
    console.log('Block result: ', result);

    // Delete all connections from this DID.
    await this.connection.deleteConnections(entry.record.author);

    // Delete all connection requests from this DID.
    await this.connection.deleteRequests(entry.record.author);

    // TODO: We should delete notifications related to this connection.
    // await this.deleteNotification(entry);
  }

  reject(entry: any) {
    entry.loading = true;

    this.connection.deleteRequest(entry);
  }
}
