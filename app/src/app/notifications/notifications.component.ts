import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../layout.service';
import { MatCardModule } from '@angular/material/card';
import { NotificationEvent, NotificationService } from '../notification.service';
import { MatIconModule } from '@angular/material/icon';
import { AgoPipe } from '../shared/pipes/ago.pipe';
import { AppService } from '../app.service';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { ProfileCardComponent } from '../shared/components/profile-card/profile-card.component';
import { ProfileHeaderComponent } from '../shared/components/profile-header/profile-header.component';
import { ConnectionEntry, ConnectionService, ConnectionType } from '../connection.service';
import { IdentityService } from '../identity.service';

@Component({
    selector: 'app-notifications',
    imports: [
        ProfileHeaderComponent,
        ProfileCardComponent,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatMenuModule,
        RouterModule,
        AgoPipe,
    ],
    templateUrl: './notifications.component.html',
    styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
  registration: ServiceWorkerRegistration | undefined;

  layout = inject(LayoutService);

  notification = inject(NotificationService);

  connection = inject(ConnectionService);

  identity = inject(IdentityService);

  app = inject(AppService);

  notifications = signal<NotificationEvent[]>([]);

  constructor() {
    this.layout.marginOn();
    this.layout.resetActions();

    effect(async () => {
      if (this.app.initialized()) {
        await this.loadNotifications();
      }
    });
  }

  async accept(entry: NotificationEvent) {
    // entry.loading = true;
    // console.log('Accepting connection request');
    // if (entry.data.app === 'Friends') {
    //   // If friends request, we will reply with a Verifiable Credential in addition to the connection request.
    //   this.connection.create({
    //     did: entry.data.author, // TODO: Change to record.author
    //   });
    //   this.deleteNotification(entry);
    //   // Accept as friend.
    // } else if (entry.data.app === 'Connect') {
    //   // If connect request, we will only reply with a connection request.
    //   this.connection.create({
    //     did: entry.data.author, // TODO: Change to record.author
    //   });
    //   this.deleteNotification(entry);
    // }
  }

  async deleteNotifications() {
    for (const notification of this.notifications()) {
      await notification.record.delete();
    }

    this.notifications.set([]);
  }

  async deleteNotification(entry: NotificationEvent) {
    entry.loading = true;

    const did = entry.record.creator;

    // Find all connection requests from this user and delete them.
    const connectionsFromUser = await this.connection.loadConnections(did);

    for (const connection of connectionsFromUser) {
      await connection.record.delete();

      // Update the list of connections on external DWNs for user.
      await connection.record.send(this.identity.did);
    }

    // Delete the notification event from the list, which should be only one pr. user.
    const { status } = await entry.record.delete();
    console.log('Delete status: ', status);

    this.notifications.update((list) => [...list.filter((n) => n.id !== entry.id)]);
  }

  async block(entry: NotificationEvent) {
    entry.loading = true;

    console.log('Blocking user', entry);

    const did = entry.record.creator;

    const result = await this.connection.block(did);
    console.log('Block result: ', result);

    await this.deleteNotification(entry);

    // // Find all connection requests from this user and delete them.
    // const connectionsFromUser = await this.connection.loadConnections(did);

    // for (const connection of connectionsFromUser) {
    //   await connection.record.delete();

    //   // Update the list of connections on external DWNs for user.
    //   await connection.record.send(this.identity.did);
    // }

    // // Delete the notification event from the list, which should be only one pr. user.
    // const { status } = await entry.record.delete();
    // console.log('Delete status: ', status);

    // this.notifications.update((list) => [...list.filter((n) => n.id !== entry.id)]);
  }

  async generateNotification() {
    // First simulate an incoming connection request.
    // await this.connection.request(
    //   'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao',
    //   {},
    //   ConnectionType.Friend,
    // );

    const event = await this.notification.create({
      author: 'did:dht:bi3bzoke6rq6fbkojpo5ebtg45eqx1owqrb4esex8t9nz14ugnao',
      title: 'Friend Request',
      description:
        'This user wants to be your friend, do you accept? This will give them access to send you sharing requets, such as shared Tasks, collabrative apps and more.',
      app: 'Friends',
      icon: 'people',
      connectRecordId: '123',
    });
    this.notifications.update((list) => [...list, event]);

    const event2 = await this.notification.create({
      author: 'did:dht:1ko4cqh7c7i9z56r7qwucgpbra934rngc5eyffg1km5k6rc5991o',
      title: 'Connect Request',
      description:
        'This user wants to connect with you, you have to accept an initial connect request to be able to receive other sharing requests, such as shared Tasks, collabrative apps and more. Only accept this request if you know the user. This is to avoid spam messages.',
      app: 'Connect',
      icon: 'connect_without_contact',
      connectRecordId: '123',
    });
    this.notifications.update((list) => [...list, event2]);
  }

  async loadNotifications() {
    const notifications = await this.notification.load();
    this.notifications.set(notifications);
  }

  async enableNotifications() {
    console.log('Notifications enabled');
    this.sendNotification('Hello World');
  }

  async disableNotifications() {
    console.log('Notifications disabled');
  }

  async ngOnInit() {
    console.log('Notifications component loaded');
    this.registration = await navigator.serviceWorker.getRegistration();
  }

  async sendNotification(message: string) {
    console.log('Sending notification');

    if (Notification.permission === 'granted') {
      console.log('Notifications enabled!!!!');
      this.showNotification(message);
    } else {
      console.error('Notifications not enabled');

      if (Notification.permission !== 'denied') {
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          this.showNotification('Hello World');
        }
      }
    }
  }

  async showNotification(message: string) {
    var title = 'Ariton says hi!';

    const payload = {
      body: message,
    };

    console.log('Showing notification');

    if (this.registration && 'showNotification' in this.registration) {
      console.log('Using service worker');
      this.registration.showNotification(title, payload);
    } else {
      console.log('Using new notification');
      new Notification(title, payload);
    }
  }
}
