import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { IdentityService } from '../../identity.service';
import { profile } from '../../../protocols';
import { Router } from '@angular/router';
import { ProfileService } from '../../profile.service';
import { NavigationService } from '../../navigation.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatSelectModule, MatIconModule, MatRadioModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class ProfileEditComponent {
  private fb = inject(FormBuilder);

  identity = inject(IdentityService);

  profileService = inject(ProfileService);

  router = inject(Router);

  data = signal<any>({});

  form = this.fb.group({
    name: null,
    title: [null, Validators.required],
    status: [null, Validators.required],
    bio: [null, Validators.required],
    location: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(5)])],
    shipping: ['free', Validators.required],
    links: this.fb.array([this.fb.control('')]),
  });

  get links() {
    return this.form.get('links') as FormArray;
  }

  constructor() {
    effect(async () => {
      if (this.identity.initialized()) {
        // Load the current identity profile.
        const result = await this.profileService.loadProfile(this.identity.did);
        this.data.set(result);

        // Only send the profile data to the form.
        this.updateForm(result.profile);
      }
    });
  }

  navigation = inject(NavigationService);

  back() {
    this.navigation.back();
  }

  updateForm(profile: any) {
    console.log('Patching form with:', profile);

    this.form.patchValue({
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      status: profile.status,
      location: profile.location,
      // birthDate: profile.birthDate,
      // avatar: profile.avatar,
      // hero: profile.hero,
    });

    // this.links.clear();
    // profile.links.forEach((link) => this.links.push(this.fb.control(link)));
  }

  addLink() {
    this.links.push(this.fb.control(''));
  }

  ngOnInit() {}

  // Step 4: Function to remove link input
  removeLink(index: number) {
    this.links.removeAt(index);
  }

  async onSubmit() {
    const formData = {
      name: this.form.value.name,
      title: this.form.value.title,
      bio: this.form.value.bio,
      status: this.form.value.status,
      location: this.form.value.location,
      // birthDate: this.form.value.birthDate,
      // avatar: this.form.value.avatar,
      // hero: this.form.value.hero,
    };

    // If record exists, update it.
    if (this.data().record) {
      const { status, record } = await this.data().record.update({
        data: formData,
      });

      console.log('Update profile status:', status, record);
    } else {
      const { status, record } = await this.identity.web5.dwn.records.create({
        data: formData,
        message: {
          published: true,
          protocol: profile.uri,
          protocolPath: 'profile',
          dataFormat: 'application/json',
        },
      });

      console.log('Save profile status:', status, record);
    }

    this.router.navigate(['/profile', this.identity.did]);
  }
}
