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
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { FileService } from '../../../file.service';
import { SizePipe } from '../../../shared/pipes/size.pipe';
import { DwnDateSort } from '@web5/agent';

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [SizePipe, BreadcrumbComponent, CommonModule, MatListModule, MatIconModule, AgoPipe, BreadcrumbComponent],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss',
})
export class FolderComponent {
  entries = signal<any[]>([]);
  // files = signal<any[]>([]);
  app = inject(AppService);
  breadcrumb = inject(BreadcrumbService);
  layout = inject(LayoutService);
  identity = inject(IdentityService);
  dialog = inject(MatDialog);
  router = inject(Router);
  route = inject(ActivatedRoute);
  fileService = inject(FileService);
  uploadProgress: number | null = null;
  isUploading = false;
  file: File | null = null;
  uploadSuccess: boolean = false;
  fileError: string | null = null;

  constructor() {
    effect(async () => {
      if (this.app.initialized()) {
        await this.loadEntries();
        // await this.loadFiles();
      }
    });

    this.route.paramMap.subscribe((params) => {
      console.log('ROUTING!!!', params.get('id'));
      this.breadcrumb.parentId = params.get('id');
      // this.id.set(params.get('id')!);
    });

    // this.route.children.forEach((child) => {
    //   child.paramMap.subscribe((params) => {
    //     console.log('CHILD ROUTING!!!', params.get('id'));
    //     // this.id.set(params.get('id')!);
    //   });
    // });

    this.layout.disableNavigation();

    this.layout.addAction({
      name: 'Upload files',
      icon: 'upload_file',
      action: () => {
        this.editFile({
          data: {
            title: '',
            body: '',
            background: '',
            collaborators: [],
            labels: [],
          },
        });
      },
    });

    this.layout.addAction({
      name: 'New folder',
      icon: 'create_new_folder',
      action: () => {
        this.editFolder({
          data: {
            name: 'Untitled folder',
            // body: '',
            // background: '',
            // collaborators: [],
            // labels: [],
          },
        });
      },
    });

    // this.fileService.registerActions(this.layout);

    // effect(async () => {
    //   if (this.app.initialized()) {
    //     await this.loadFolders();
    //     await this.loadFiles();
    //   }
    // });
  }

  // onFileSelected(event: any) {
  //   this.file = event.target.files[0];
  //   if (this.file) {
  //     const fileType = this.file.type;
  //     if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
  //       this.fileError = 'Only PNG or JPG files are allowed';
  //       this.file = null; // Reset the file
  //       this.uploadSuccess = false;
  //     } else {
  //       this.fileError = null;
  //     }
  //   }
  // }

  async editFile(data: any) {
    document.getElementById('input')?.click();
  }

  async onFileSelected(event: any) {
    const files = event.currentTarget.files;

    if (files.length == 0) {
      return;
    }

    console.log('Uploading number of files:', files.length);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file);
      const blob = new Blob([file], { type: file.type });

      console.log(blob);

      console.log('Parent ID:', this.breadcrumb.parentId);

      // const file = event.currentTarget.files[0];
      const { status: fileStatus, record } = await this.identity.web5.dwn.records.create({
        data: blob,
        message: {
          protocol: fileDefinition.protocol,
          protocolPath: 'attachment',
          // parentContextId: this.breadcrumb.parentId!,
          schema: fileDefinition.types.attachment.schema,
          dataFormat: blob.type,
          // dataFormat: this.file.type,
          // dataFormat: fileDefinition.types.attachment.dataFormats[0],
        },
      });

      console.log('Record created:', record);
      console.log('Record status:', fileStatus);

      const data = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        entryType: 'file',
        attachment: record!.id,
      };

      const { status: fileStatus2, record: record2 } = await this.identity.web5.dwn.records.create({
        data: data,
        message: {
          tags: {
            type: file.type, // Do we ever need to index and query on file types? Perhaps to find "PDF" files only?
            entryType: 'file',
            attachment: record!.id, // Store a reference to download the binary file.
          },
          protocol: fileDefinition.protocol,
          protocolPath: 'entry',
          parentContextId: (this.breadcrumb.parentId ??= undefined),
          schema: fileDefinition.types.entry.schema,
          // dataFormat: this.file.type,
          dataFormat: fileDefinition.types.entry.dataFormats[0],
        },
      });

      console.log('Record created:', record2);
      console.log('Record status:', fileStatus2);

      if (record2) {
        // const data = await record2.data.blob();
        // console.log(data);

        this.entries.update((records) => [...records, { record: record2, data: data }]);
      }
    }

    // console.log('File selected:', this.file);
    // console.log('Schema', fileDefinition.types.attachment.schema);
    // console.log(fileDefinition.types.attachment.dataFormats[0]);

    // const imageBlob = new Blob(
    //   [
    //     /* binary image data */
    //   ],
    //   { type: 'image/png' },
    // );

    // console.log(this.file instanceof Blob); // true

    // var file = input.files[0];
    // var reader = new FileReader();
    // reader.addEventListener('load', readFile);
    // reader.readAsText(file);

    // const file = new File(['hello', ' ', 'world'], 'hello_world.txt', { type: 'text/plain' });
    // //or const file = document.querySelector('input[type=file]').files[0];
    // const reader = new FileReader();
    // reader.onload = function (e) {
    //   const blob = new Blob([new Uint8Array(e.target.result)], { type: file.type });
    //   console.log(blob);
    // };
    // reader.readAsArrayBuffer(file);

    // const file = new File(['hello', ' ', 'world'], 'hello_world.txt', { type: 'text/plain' });
    // //or const file = document.querySelector('input[type=file]').files[0];

    // file.arrayBuffer().then((arrayBuffer) => {
    //   const blob = new Blob([new Uint8Array(arrayBuffer)], { type: file.type });
    //   console.log(blob);
    // });

    // const fileToBlob = async (file) => new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });
    // console.log(await fileToBlob(new File(['hello', ' ', 'world'], 'hello_world.txt', { type: 'text/plain' })));

    // let blob = new Blob(await file.arrayBuffer());

    // if (options.data) {
    //   options.dataFormat = options.data.type;
    //   if (options.data instanceof File) {
    //     options.data = new Blob([options.data], { type: options.dataFormat });
    //   }
    // }

    // let record = _record || (await datastore.getProfileImage(type, { from }));
    // let blob = file ? new Blob([file], { type: file.type }) : undefined;

    // return record;

    // if (this.file) {
    //   const fileType = this.file.type;
    //   if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
    //     this.fileError = 'Only PNG or JPG files are allowed';
    //     this.file = null; // Reset the file
    //     this.uploadSuccess = false;
    //   } else {
    //     this.fileError = null;
    //   }
    // }
  }

  async cancelUpload() {}

  // Create a file record
  async upload() {
    // console.log('Which is more correct?');
    // console.log(event.target);
    // console.log(event.currentTarget);

    console.log('Uploading file');

    // const file = event.currentTarget.files[0];
    const { status: fileStatus, record } = await this.identity.web5.dwn.records.create({
      data: this.file,
      message: {
        schema: fileDefinition.types.attachment.schema,
        // dataFormat: fileDefinition.types.attachment.dataFormats[0],
      },
    });

    console.log('Record created:', record);
    console.log('Record status:', fileStatus);

    return record;
  }

  async editFolder(entry: any) {
    let data: DialogData = {
      name: entry.data.name,
      entryType: 'folder',
      // body: entry.data.body,
      // background: entry.data.background,
      // collaborators: ['12', '33333'],
      // labels: ['label2', 'label3'],
    };

    const original = JSON.parse(JSON.stringify(data));

    const dialogRef = this.dialog.open(FolderDialogComponent, {
      maxWidth: '80vw',
      maxHeight: '80vh',
      data: data,
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!result) {
        // Reset the original data if user cancels.
        data = original;
      } else {
        console.log('data result for saving:', data);

        // Update the data from old to new.
        entry.data = data;

        await this.saveFolder(entry, data);

        // Update the data so it's displayed in the UI without re-query DWN.
        // this.files().find((r) => r.record == entry.record).data = data;
      }
    });

    return dialogRef.afterClosed();
  }

  async saveFolder(entry: any, data: DialogData) {
    if (entry.record) {
      // Will this work?
      // entry.record.tags.labels = data.labels;

      const { status, record } = await entry.record.update({
        data: data,
      });

      console.log('Record created:', record);
      console.log('Record status:', status);

      if (record) {
      }
    } else {
      const { record, status } = await this.identity.web5.dwn.records.create({
        data: data,
        message: {
          // Don't know if tags will be used yet for files here, but we store it for now
          // for consideration in the future.
          tags: {
            entryType: data.entryType,
          },
          protocol: fileDefinition.protocol,
          protocolPath: 'entry',
          schema: fileDefinition.types.entry.schema,
          dataFormat: fileDefinition.types.entry.dataFormats[0],
        },
      });

      console.log('Record created:', record);
      console.log('Record status:', status);

      if (record) {
        entry.record = record;
        this.entries.update((records) => [...records, entry]);
      }
    }
  }

  async openEntry(entry: any) {
    if (entry.entryType === 'folder') {
      this.router.navigate(['/app/files/folder', entry.record.id]);
    } else {
      this.router.navigate(['/app/files/file', entry.record.id]);
    }
  }

  async loadEntries(tags?: any) {
    console.log('VALUE OF TAGS:', tags);

    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: fileDefinition.protocol,
          protocolPath: 'entry',
          schema: fileDefinition.types.entry.schema,
          dataFormat: fileDefinition.types.entry.dataFormats[0],
        },
        dateSort: DwnDateSort.CreatedDescending,
      },
    });

    //     let json = {};
    // let recordEntry = null;

    this.entries.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        // if (record.author == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.entries.update((records) => [...records, json]);
      }
    }

    console.log('All requests:', this.entries());
  }

  // async loadFiles(tags?: any) {
  //   console.log('VALUE OF TAGS:', tags);

  //   var { records } = await this.identity.web5.dwn.records.query({
  //     message: {
  //       filter: {
  //         protocol: fileDefinition.protocol,
  //         protocolPath: 'entry',
  //         schema: fileDefinition.types.entry.schema,
  //         dataFormat: fileDefinition.types.entry.dataFormats[0],
  //       },
  //     },
  //   });

  //   //     let json = {};
  //   // let recordEntry = null;

  //   this.files.set([]);

  //   if (records) {
  //     // Loop through returned records and print text from each
  //     for (const record of records) {
  //       let data = await record.data.json();
  //       let json: any = { record: record, data: data };

  //       // if (record.author == this.identity.did) {
  //       //   json.direction = 'out';
  //       // }

  //       this.files.update((records) => [...records, json]);
  //     }
  //   }

  //   console.log('All requests:', this.files());
  // }
}
