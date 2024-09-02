import { Component, effect, inject, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../identity.service';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { ProfileCardComponent } from '../shared/components/profile-card/profile-card.component';
import { ProfileImageDirective } from '../shared/directives/profile-image.directive';
import { DidComponent } from '../shared/components/did/did.component';
import { RouterModule } from '@angular/router';
import { LayoutService } from '../layout.service';
import { FriendService } from '../friend.service';
import { ConnectionEntry, ConnectionService } from '../connection.service';
import { RequestComponent } from '../settings/connections/request.component';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    ProfileCardComponent,
    ProfileImageDirective,
    DidComponent,
    RouterModule,
    RequestComponent,
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.scss',
})
export class FriendsComponent {
  friends: ConnectionEntry[] = [];

  requests: ConnectionEntry[] = [];

  identity = inject(IdentityService);

  friend = inject(FriendService);

  connection = inject(ConnectionService);

  layout = inject(LayoutService);

  app = inject(AppService);

  constructor() {
    this.layout.resetActions();

    effect(async () => {
      if (this.app.initialized() && this.connection.connections()) {
        await this.loadFriends();
      }
    });

    effect(async () => {
      if (this.app.initialized() && this.connection.requests()) {
        await this.loadRequests();
      }
    });
  }

  async loadRequests() {
    this.requests = this.connection.friendRequests();
  }

  async loadFriends() {
    console.log('LOAD FRIENDS:');
    console.log(this.connection.connections());
    console.log(this.connection.friends());

    // Get a local reference to friends, we probably will add features such as sorting in the future.
    this.friends = this.connection.friends();
  }

  ngOnInit() {
    this.layout.marginOff();
  }
}
