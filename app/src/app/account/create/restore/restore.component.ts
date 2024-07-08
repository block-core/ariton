import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector: 'app-restore',
    standalone: true,
    imports: [MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatRadioModule, MatCardModule, ReactiveFormsModule],
    templateUrl: './restore.component.html',
    styleUrl: './restore.component.scss',
})
export class RestoreComponent {
    private fb = inject(FormBuilder);

    addressForm = this.fb.group({
        recoveryPhrase: [null, Validators.required],
    });

    onSubmit(): void {
        console.log(this.addressForm.controls.recoveryPhrase.value);
        alert('Thanks!');
    }
}
