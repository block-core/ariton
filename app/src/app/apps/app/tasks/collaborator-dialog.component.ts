import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface DialogData {
  title: string;
  body: string;
  background: string;
  collaborators: string[];
  labels: string[];
}

@Component({
  selector: 'app-collaborator-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './collaborator-dialog.component.html',
  styleUrl: './collaborator-dialog.component.scss',
})
export class CollaboratorDialogComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    collaborators: this.fb.array([this.fb.control('')]),
  });

  constructor(
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngAfterViewInit() {}

  // async onSubmit() {
  //   const title = this.form.controls.title.value;
  //   const body = this.form.controls.body.value;
  //   const collaborators = this.form.controls.collaborators.value!;
  //   const background = this.form.controls.background.value!;

  //   this.dialogRef.close({
  //     title,
  //     body,
  //     collaborators,
  //     background,
  //   });
  // }

  get collaborators() {
    return this.form.get('collaborators') as FormArray;
  }

  addLink() {
    this.collaborators.push(this.fb.control(''));
  }

  // Step 4: Function to remove link input
  removeLink(index: number) {
    this.collaborators.removeAt(index);
  }

  async onSubmit() {
    console.log(this.form.value.collaborators);
    // const formData = {
    //   name: this.form.value.name,
    //   title: this.form.value.title,
    //   bio: this.form.value.bio,
    //   status: this.form.value.status,
    //   location: this.form.value.location,
    //   // birthDate: this.form.value.birthDate,
    //   // avatar: this.form.value.avatar,
    //   // hero: this.form.value.hero,
    // };

    // // If record exists, update it.
    // if (this.data().record) {
    //   const { status, record } = await this.data().record.update({
    //     published: true,
    //     data: formData,
    //   });

    //   console.log('Update profile status:', status, record);

    //   // Send the record immediately to user public DWN.
    //   const { status: recordSendStatus } = await this.data().record.send(this.identity.did);
    //   console.log('Send profile status:', recordSendStatus);
    // } else {
    //   const { status, record } = await this.identity.web5.dwn.records.create({
    //     data: formData,
    //     message: {
    //       // TODO: Remove this line when the DWN supports query by protocol access.
    //       published: true,
    //       protocol: profileDefinition.protocol,
    //       protocolPath: 'profile',
    //       schema: profileDefinition.types.profile.schema,
    //       dataFormat: profileDefinition.types.profile.dataFormats[0],
    //     },
    //   });
    //   console.log('Save profile status:', status, record);

    //   // Send the record immediately to user public DWN.
    //   const { status: recordSendStatus } = await record!.send(this.identity.did);
    //   console.log('Send profile status:', recordSendStatus);
    // }

    // // TODO: Check if the avatar has changed before uploading. Don't upload if it hasn't.
    // const avatarRecord = await this.upload(this.form.controls.avatar.value, this.data().avatarRecord);

    // if (avatarRecord) {
    //   // Send the record immediately to user public DWN.
    //   const { status: recordSendStatus } = await avatarRecord!.send(this.identity.did);
    //   console.log('Send avatar status:', recordSendStatus);
    // }
    // // }

    // this.router.navigate(['/profile', this.identity.did]);
  }
}
