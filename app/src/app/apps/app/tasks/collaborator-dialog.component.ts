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
    collaborators: this.fb.array([]),
  });

  constructor(
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    // Populate the FormArray with existing values.
    data.collaborators.map((collaborator) => {
      this.form.controls.collaborators.push(this.fb.control(collaborator));
    });
  }

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
    // Trim the collaborators array to exclude empty string values
    const trimmedCollaborators = this.form.value.collaborators!.filter((n) => n);
    this.data.collaborators = trimmedCollaborators as string[];
  }
}
