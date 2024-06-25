import { Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {Validators} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IdentityService } from '../../identity.service';
import { Web5IdentityAgent } from '@web5/identity-agent';

@Component({
  selector: 'app-unlock',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './unlock.component.html',
  styleUrl: './unlock.component.scss'
})
export class UnlockComponent {
  passwordInput = new FormControl('', Validators.required);

  hide = signal(true);

  invalidPassword = signal(false);

  constructor(private identityService: IdentityService) {}

  /*
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide);
    event.stopPropagation();
  }*/

  async onSubmit() {
    console.log('ON SUBMIT!');
    const unlocked = await this.identityService.unlock(this.passwordInput.value!);

    if (unlocked) {
      console.log('Vault unlocked');
      this.invalidPassword.set(false);
    } else {
      console.log('Failed to unlock vault');
      this.invalidPassword.set(true);
    }
  }
}
