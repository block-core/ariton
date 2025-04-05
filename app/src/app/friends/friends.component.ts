import { Component, effect, inject, signal, model } from '@angular/core';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';

@Component({
    selector: 'app-friends',
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
        MatButtonToggleModule,
        FormsModule,
        SafeUrlPipe,
    ],
    templateUrl: './friends.component.html',
    styleUrl: './friends.component.scss'
})
export class FriendsComponent {
  friends: ConnectionEntry[] | any[] = [];

  requests: ConnectionEntry[] = [];

  identity = inject(IdentityService);

  friend = inject(FriendService);

  connection = inject(ConnectionService);

  layout = inject(LayoutService);

  app = inject(AppService);

  profile = inject(ProfileService);

  viewMode = model<'list' | 'thumbnail'>('list');

  private avatarUrls: { [key: string]: string } = {};

  private profiles: { [key: string]: any } = {};

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

  // async avatar(did: string | undefined) {
  //   console.log('Load avatar:', did);
  //   if (did == null) {
  //     return;
  //   }

  //   const avatar = await this.profile.loadAvatar(did);
  //   console.log('Avatar:', avatar);
  //   return avatar?.avatar;
  // }

  async loadRequests() {
    this.requests = this.connection.friendRequests();
  }

  async loadFriends() {
    console.log('LOAD FRIENDS:');
    console.log(this.connection.connections());
    console.log(this.connection.friends());

    // Get a local reference to friends, we probably will add features such as sorting in the future.
    this.friends = this.connection.friends();

    for (var friend of this.friends) {
      // This is a temporary solution to load the profile and avatars,
      // it's not really very optimiazed at all.
      const profile = await this.profile.loadProfile(friend.data.did!);
      if (profile) {
        this.profiles[friend.data.did!] = profile;
      }

      const avatar = await this.profile.loadAvatar(friend.data.did!);
      // const avatar = await this.avatar(friend.data.did);
      if (avatar && avatar.avatar) {
        this.avatarUrls[friend.data.did!] = avatar.avatar;
      }

      const f = friend as any;

      f.profile = profile;
      f.avatar = avatar.avatar;
    }

    console.log(this.avatarUrls);

    // this.friends.forEach(async (friend) => {

    // });
  }

  getAvatarUrl(did: string): string {
    return this.avatarUrls[did] || '/avatar-placeholder.png';
  }

  toggleViewMode() {
    this.viewMode.set(this.viewMode() === 'list' ? 'thumbnail' : 'list');
  }

  ngOnInit() {
    this.layout.marginOff();
  }
}
