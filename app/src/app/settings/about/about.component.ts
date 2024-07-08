import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../../app.service';
import { MatListModule } from '@angular/material/list';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [MatCardModule, MatListModule],
    templateUrl: './about.component.html',
    styleUrl: './about.component.scss',
})
export class AboutComponent {
    appService = inject(AppService);
}
