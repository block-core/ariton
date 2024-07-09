import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IdentityService } from '../../../identity.service';
import { CryptoService } from '../../../crypto.service';
import { AppService } from '../../../app.service';

@Component({
    selector: 'app-restore',
    standalone: true,
    imports: [MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatRadioModule, MatCardModule, ReactiveFormsModule],
    templateUrl: './restore.component.html',
    styleUrl: './restore.component.scss',
})
export class RestoreComponent {
    private fb = inject(FormBuilder);

    crypto = inject(CryptoService);

    app = inject(AppService);

    private identity = inject(IdentityService);

    addressForm = this.fb.group({
        recoveryPhrase: [null, Validators.required],
    });

    async onSubmit() {
        console.log(this.addressForm.controls.recoveryPhrase.value);

        this.addressForm.disable();

        this.app.loading.set(true);

        // Create a unique password for the user that they can replace.
        let password = await this.crypto.createPassword();

        const account = {
            did: '',
            recoveryPhrase: this.addressForm.controls.recoveryPhrase.value!,
            password,
            passwordHash: '',
        };

        password = '123';

        const result = await this.identity.restore(password, this.addressForm.controls.recoveryPhrase.value!);

        console.log('RESTORE Result: ', result);

        if (!result) {
            alert('Failed to restore account.');
            this.addressForm.enable();
            return;
        }

        account.did = result.did;

        this.app.addAccount(account);

        this.app.initialized.set(true);
        this.app.loading.set(false);
    }
}
