import { Component, signal } from '@angular/core';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [FormsModule, MatProgressSpinnerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {

  passwordInputPrevious = new FormControl('', Validators.required);
  passwordInput = new FormControl('', Validators.required);
  passwordInputRepeat = new FormControl('', Validators.required);

  unlocking = signal(false);

  invalidPassword = signal(false);

  constructor(private identityService: IdentityService, private router: Router) { }

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

  async onSubmit() {
    this.unlocking.set(true);

    if (this.passwordInput.value !== this.passwordInputRepeat.value) {
      this.invalidPassword.set(true);
      this.unlocking.set(false);
      console.error('Passwords do not match');
      throw new Error('Passwords do not match');
    }

    try {
      await this.changePassword(this.passwordInputPrevious.value!, this.passwordInput.value!, this.passwordInputRepeat.value!);
    } catch (error) {
      console.error(error);
      this.invalidPassword.set(true);
      this.unlocking.set(false);
      return;
    }

    this.invalidPassword.set(false);
    this.unlocking.set(false);

    this.router.navigate(['/account', 'did:dht:umj7apgmkodtrb7mdpjo4h7xinqdnatzgy38j7wi67k9c7sdns1o']);
  }
}
