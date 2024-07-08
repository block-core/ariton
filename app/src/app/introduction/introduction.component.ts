import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { StorageService } from '../storage.service';
import { AppService } from '../app.service';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-introduction',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatDividerModule, RouterLink],
    templateUrl: './introduction.component.html',
    styleUrl: './introduction.component.scss',
})
export class IntroductionComponent {
    appService = inject(AppService);

    reset = computed(() => this.appService.account().passwordHash);

    backup = computed(() => this.appService.state().backupConfirmed);
}
