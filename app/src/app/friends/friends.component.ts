import { Component, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [MatListModule, MatCardModule, MatButtonModule, MatTabsModule, MatIconModule, MatBadgeModule, MatMenuModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export class FriendsComponent {
  requests = signal<any[]>([]);

  friends = signal<any[]>([]);

  accept(did: string) {}

  reject(did: string) {}

  ngOnInit() {
    this.friends.set([
      {
        name: 'Lu',
        thumbnail: 'https://ariton.app/assets/lu.jpg',
      },
      {
        name: 'Sondre',
        thumbnail: 'https://ariton.app/assets/sondre.png',
      },
    ]);

    this.requests.set([
      {
        name: 'Lu',
        thumbnail: 'https://ariton.app/assets/lu.jpg',
      },
    ]);
  }
}
