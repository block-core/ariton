import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  registration: ServiceWorkerRegistration | undefined;

  layout = inject(LayoutService);

  constructor() {
    this.layout.resetActions();
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
