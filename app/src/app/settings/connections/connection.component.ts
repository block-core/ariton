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
  selector: 'app-connection',
  standalone: true,
  imports: [ProfileHeaderComponent, AgoPipe, CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './connection.component.html',
  styleUrl: './connection.component.scss',
})
export class ConnectionComponent {
  @Input() public entry?: ConnectionEntry = undefined;

  connection = inject(ConnectionService);

  app = inject(AppService);

  constructor() {}

  deleteConnection(entry: any) {
    entry.loading = true;

    this.connection.deleteConnection(entry);

    // TODO: We should delete notifications related to this connection.
  }

  block(entry: any) {
    entry.loading = true;

    this.connection.block(entry.recipient);
    // TODO: We should delete notifications related to this connection.
  }
}
