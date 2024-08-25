import { Component, effect, inject, signal } from '@angular/core';
import { ConnectionService } from '../../connection.service';
import { AppService } from '../../app.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AgoPipe } from '../../shared/pipes/ago.pipe';

@Component({
  selector: 'app-connections',
  standalone: true,
  imports: [AgoPipe, CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './connections.component.html',
  styleUrl: './connections.component.scss',
})
export class ConnectionsComponent {
  service = inject(ConnectionService);

  app = inject(AppService);

  constructor() {
    // effect(async () => {
    //   if (this.app.initialized()) {
    //   }
    // });
  }

  // async load() {
  //   const blocks = await this.service.loadBlocks();
  //   this.blocks.set(blocks);
  // }

  deleteConnection(entry: any) {
    entry.loading = true;

    this.service.deleteConnection(entry);
  }
}
