import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule

  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class ProfileEditComponent {
  private fb = inject(FormBuilder);

  addressForm = this.fb.group({
    name:  null,
    title: [null, Validators.required],
    status: [null, Validators.required],
    bio: [null, Validators.required],
    address2: null,
    location: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required],
    links: this.fb.array([this.fb.control('')]),
  });

  get links() {
    return this.addressForm.get('links') as FormArray;
  }

  addLink() {
    this.links.push(this.fb.control(''));
  }

  ngOnInit() {
    
  }

// Step 4: Function to remove link input
removeLink(index: number) {
  this.links.removeAt(index);
}

  onSubmit(): void {
    alert('Thanks!');
  }
}
