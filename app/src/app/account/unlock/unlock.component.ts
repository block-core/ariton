import { Component, computed, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Validators } from '@angular/forms';
import { IdentityService } from '../../identity.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-unlock',
  standalone: true,
  imports: [FormsModule, MatProgressSpinnerModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './unlock.component.html',
  styleUrl: './unlock.component.scss'
})
export class UnlockComponent {
  passwordInput = new FormControl('', Validators.required);

  hide = signal(true);

  unlocking = signal(false);

  invalidPassword = signal(false);

  loading = false;

  passwordSignal = toSignal(this.passwordInput.valueChanges, { initialValue: '' });

  disabled = computed(() => {
    console.log('computed');
    return this.passwordInput.invalid;
  });

  constructor(private identityService: IdentityService) { }

  save() {
    this.loading = true;
  }

  async onSubmit() {
    this.unlocking.set(true);
    const unlocked = await this.identityService.unlock(this.passwordInput.value!);

    if (unlocked) {
      console.log('Vault unlocked');
      this.invalidPassword.set(false);
    } else {
      console.log('Failed to unlock vault');
      this.invalidPassword.set(true);
    }

    this.unlocking.set(false);
  }
}
