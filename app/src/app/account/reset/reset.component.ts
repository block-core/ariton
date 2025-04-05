import { Component, computed, effect, signal } from '@angular/core';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AppService } from '../../app.service';

@Component({
    selector: 'app-password-reset',
    imports: [
        MatCardModule,
        FormsModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
    ],
    templateUrl: './reset.component.html',
    styleUrl: './reset.component.scss'
})
export class PasswordResetComponent {
  passwordInputPrevious = new FormControl('', Validators.required);

  /** Indicates if the view should be password set or password reset. */
  reset = computed(() => this.appService.agent()?.passwordHash);

  unlocking = signal(false);

  invalidPassword = signal(false);

  constructor(private appService: AppService, private identityService: IdentityService, private router: Router) {}

  async ngOnLoad() {}

  async changePassword(oldPassword: string, newPassword: string) {
    // Do we want to allow empty passwords? If so, this must be changed.
    if (!oldPassword) {
      oldPassword = 'insecure-static-phrase';
    }

    // Initialize the identity service with the password to create an
    // initial account.
    // result = await this.appService.identity.initialConnect(password);

    await this.identityService.changePassword(oldPassword, newPassword);

    // Set the password on local state as user will now auto-login.
    this.appService.agent()!.password = newPassword;

    // Reset the password hash to indicate that the password has been set.
    this.appService.agent()!.passwordHash = '';

    this.appService.saveAgent(this.appService.agent()!);
    // this.appService.saveAccounts();

    console.log('Password changed');
  }

  async onSubmit() {
    this.unlocking.set(true);

    try {
      let password: any = '';

      // if (this.reset()) {
      password = this.passwordInputPrevious.value!;
      // } else {
      //   password = this.appService.agent()!.password;
      // }

      // Create a unique password for the user that they can replace.
      const newPassword = await this.appService.crypto.createPassword();

      await this.changePassword(password, newPassword);

      // await this.changePassword(password, this.passwordInput.value!, this.passwordInputRepeat.value!);
    } catch (error) {
      console.error(error);
      this.invalidPassword.set(true);
      this.unlocking.set(false);
      return;
    }

    this.invalidPassword.set(false);
    this.unlocking.set(false);

    this.router.navigate(['/introduction']);
  }
}
