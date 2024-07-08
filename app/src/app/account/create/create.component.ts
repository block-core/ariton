import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-create',
    standalone: true,
    imports: [RouterLink, MatButtonModule],
    templateUrl: './create.component.html',
    styleUrl: './create.component.scss',
})
export class CreateComponent {}
