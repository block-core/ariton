import { Component, inject, input } from '@angular/core';
import { IdentityService } from '../../../identity.service';

@Component({
  selector: 'app-profile-image',
  standalone: true,
  imports: [],
  templateUrl: './profile-image.component.html',
  styleUrl: './profile-image.component.scss',
})
export class ProfileImageComponent {
  identity = inject(IdentityService);

  did = input.required<string>();
}
