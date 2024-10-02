import { Component, inject } from '@angular/core';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOn();
  }
}
