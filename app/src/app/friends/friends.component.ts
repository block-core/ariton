import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export class FriendsComponent {
  requests = signal<any[]>([]);

  accept(did: string) {}

  reject(did: string) {}

  ngOnInit() {
    this.requests.set([
      {
        name: 'Lu',
        thumbnail: 'https://ariton.app/assets/lu.jpg',
      },
    ]);
  }
}
