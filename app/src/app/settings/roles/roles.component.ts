import { Component, signal } from '@angular/core';
import { RequestComponent } from '../connections/request.component';
import { ConnectionComponent } from '../connections/connection.component';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';
import { AgoPipe } from '../../shared/pipes/ago.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    RequestComponent,
    ConnectionComponent,
    ProfileHeaderComponent,
    AgoPipe,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  roles = signal<any[]>([]);
}
