import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
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
  selector: 'app-post-dialog',
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
  ],
  templateUrl: './post-dialog.component.html',
  styleUrl: './post-dialog.component.scss',
})
export class PostDialogComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    body: [null, Validators.required],
  });

  constructor(public dialogRef: MatDialogRef<PostDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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

  async onColorChange(event: Event) {
    const newValue = (event.target as HTMLInputElement).value;
    this.data.background = newValue;
  }
}
