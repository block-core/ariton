import { Component, effect, inject, signal } from '@angular/core';
import { AvatarComponent } from '../../profile/edit/avatar/avatar.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../identity.service';
import { ProfileService } from '../../profile.service';
import { Router } from '@angular/router';
import { NavigationService } from '../../navigation.service';
import { profile } from '../../../protocols';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [
    MatSelectModule,
    AvatarComponent,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent {
  private fb = inject(FormBuilder);

  identity = inject(IdentityService);

  profileService = inject(ProfileService);

  navigation = inject(NavigationService);

  router = inject(Router);

  data = signal<any>({});

  form = this.fb.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    title: [null],
    status: [null],
    bio: [null],
    location: [null],
    avatar: [''],
    owners: this.fb.array([this.fb.control('')]),
  });

  communityTypes = [
    {
      type: 'general',
      name: 'General',
    },
    {
      type: 'power',
      name: 'Power Structure',
    },
    {
      type: 'company',
      name: 'Company Structure',
    },
  ];

  get owners() {
    return this.form.get('owners') as FormArray;
  }

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

  addOwner() {
    this.owners.push(this.fb.control(''));
  }

  removeOwner(index: number) {
    this.owners.removeAt(index);
  }

  constructor() {
    effect(async () => {
      if (this.identity.initialized()) {
        // Set the initial owner to current user.
        console.log(this.owners);
        this.owners.setValue([this.identity.did]);
      }
    });
  }

  ngOnInit() {}

  async onSubmit() {
    // Don't do anything on submit, just redirect to community page.
    // const formData = {
    //   name: this.form.value.name,
    //   title: this.form.value.title,
    //   bio: this.form.value.bio,
    //   status: this.form.value.status,
    //   location: this.form.value.location,
    // };

    // // If record exists, update it.
    // if (this.data().record) {
    //   const { status, record } = await this.data().record.update({
    //     published: true,
    //     data: formData,
    //   });

    //   console.log('Update profile status:', status, record);
    // } else {
    //   const { status, record } = await this.identity.web5.dwn.records.create({
    //     data: formData,
    //     message: {
    //       // published: true, /* published ignores the protocol permissions. */
    //       protocol: profile.uri,
    //       protocolPath: 'profile',
    //       dataFormat: 'application/json',
    //     },
    //   });

    //   console.log('Save profile status:', status, record);
    // }

    // // TODO: Check if the avatar has changed before uploading. Don't upload if it hasn't.
    // await this.upload(this.form.controls.avatar.value, this.data().avatarRecord);

    this.router.navigate(['/community', this.identity.did]);
  }

  async upload(imageBase64: any, record: any) {
    if (!imageBase64) {
      console.log('No image to upload.');
      return;
    }

    console.log(record);
    // const blob = new Blob(event.currentTarget.files, { type: 'image/png' });
    if (record) {
      console.log('UPDATING IMAGE!!!!');
      const { status, updatedRecord } = await record.update({
        published: true,
        data: imageBase64,
      });

      console.log('Update profile status:', status, updatedRecord);
      return updatedRecord;
    } else {
      const { record } = await this.identity.web5.dwn.records.create({
        data: imageBase64,
        message: {
          protocol: profile.uri,
          protocolPath: 'avatar',
          dataFormat: 'image/png',
          tags: {
            module: 'community',
          },
        },
      });

      return record;
    }
  }
}
