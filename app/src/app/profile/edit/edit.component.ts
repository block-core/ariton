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
import { AvatarComponent } from './avatar/avatar.component';
import { protocolDefinition as profileDefinition } from '../../../protocols/profile';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    AvatarComponent,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
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
    status: [null],
    bio: [null],
    location: [null],
    avatar: [''],
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

        this.form.patchValue({
          avatar: result.avatar,
        });
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

  // Create a blob record
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
          published: true,
          protocol: profileDefinition.protocol,
          protocolPath: 'avatar',
          dataFormat: 'image/png',
          tags: {
            module: 'profile',
          },
        },
      });

      return record;
    }
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
        published: true,
        data: formData,
      });

      console.log('Update profile status:', status, record);

      // Send the record immediately to user public DWN.
      const { status: recordSendStatus } = await this.data().record.send(this.identity.did);
      console.log('Send profile status:', recordSendStatus);
    } else {
      const { status, record } = await this.identity.web5.dwn.records.create({
        data: formData,
        message: {
          // TODO: Remove this line when the DWN supports query by protocol access.
          published: true,
          protocol: profileDefinition.protocol,
          protocolPath: 'profile',
          schema: profileDefinition.types.profile.schema,
          dataFormat: profileDefinition.types.profile.dataFormats[0],
        },
      });
      console.log('Save profile status:', status, record);

      // Send the record immediately to user public DWN.
      const { status: recordSendStatus } = await record!.send(this.identity.did);
      console.log('Send profile status:', recordSendStatus);
    }

    // If avatar record exists, update it.
    // if () {
    //   const { status, record } = await this.data().record.update({
    //     published: true,
    //     data: formData,
    //   });

    //   console.log('Update profile status:', status, record);
    // } else {

    // TODO: Check if the avatar has changed before uploading. Don't upload if it hasn't.
    const avatarRecord = await this.upload(this.form.controls.avatar.value, this.data().avatarRecord);

    if (avatarRecord) {
      // Send the record immediately to user public DWN.
      const { status: recordSendStatus } = await avatarRecord!.send(this.identity.did);
      console.log('Send avatar status:', recordSendStatus);
    }
    // }

    this.router.navigate(['/profile', this.identity.did]);
  }
}
