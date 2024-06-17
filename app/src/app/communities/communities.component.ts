import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-communities',
  standalone: true,
  imports: [
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './communities.component.html',
  styleUrl: './communities.component.scss',
})
export class CommunitiesComponent {
  search = new FormControl('');
  view = new FormControl('card');

}
