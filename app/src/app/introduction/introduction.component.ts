import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { AppService } from '../app.service';
import { MatCardModule } from '@angular/material/card';
import { LayoutService } from '../layout.service';

@Component({
    selector: 'app-introduction',
    imports: [MatCardModule, MatButtonModule, MatDividerModule, RouterLink],
    templateUrl: './introduction.component.html',
    styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {
  appService = inject(AppService);

  reset = computed(() => this.appService.agent()?.passwordHash);

  backup = computed(() => this.appService.state().backupConfirmed);

  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOn();
  }
}
