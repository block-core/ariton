import { Component } from '@angular/core';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  constructor(private identityService: IdentityService) {}

  async changePassword(oldPassword: string, newPassword: string, confirmPassword: string) {
    if (newPassword != confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Do we want to allow empty passwords? If so, this must be changed.
    if (!oldPassword) {
      oldPassword = 'insecure-static-phrase';
    }

    await this.identityService.changePassword(oldPassword, newPassword);

    console.log('Password changed');
  }
}
