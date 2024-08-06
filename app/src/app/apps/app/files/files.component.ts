import { Component, effect, inject, signal } from '@angular/core';
import { AppService } from '../../../app.service';
import { LayoutService } from '../../../layout.service';
import { IdentityService } from '../../../identity.service';
import { protocolDefinition as fileDefinition } from '../../../../protocols/file';
import { DialogData, FolderDialogComponent } from './folder-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AgoPipe } from '../../../shared/pipes/ago.pipe';
import { BreadcrumbComponent } from '../../../breadcrumb/breadcrumb.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { FileService } from '../../../file.service';

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [RouterOutlet, BreadcrumbComponent, CommonModule, MatListModule, MatIconModule, AgoPipe],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  // id = signal<string | undefined>(undefined);

  constructor() {
    // this.route.paramMap.subscribe((params) => {
    //   console.log('ROUTING!!!', params.get('id'));
    //   this.id.set(params.get('id')!);
    // });
    // this.route.children.forEach((child) => {
    //   child.paramMap.subscribe((params) => {
    //     console.log('CHILD ROUTING!!!', params.get('id'));
    //     this.id.set(params.get('id')!);
    //   });
    // });
  }
}
