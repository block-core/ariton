import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-account',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, RouterLink],
    templateUrl: './account.component.html',
    styleUrl: './account.component.scss',
})
export class AccountComponent {}
