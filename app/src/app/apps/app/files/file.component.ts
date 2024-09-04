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
import { FileViewerComponent } from '../../../shared/components/file-viewer/file-viewer.component';
import { FileMimeType } from '../../../shared/components/file-viewer/file-mime-type';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Record } from '@web5/api';
import { NavigationService } from '../../../navigation.service';

@Component({
  selector: 'app-file',
  standalone: true,
  imports: [
    FileViewerComponent,
    SizePipe,
    BreadcrumbComponent,
    CommonModule,
    MatListModule,
    MatIconModule,
    AgoPipe,
    BreadcrumbComponent,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './file.component.html',
  styleUrl: './file.component.scss',
})
export class FileComponent {
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

  fileId: string | null = null;
  sanitizer = inject(DomSanitizer);
  record?: Record;
  navigation = inject(NavigationService);

  constructor() {
    effect(async () => {
      if (this.app.initialized()) {
        await this.loadEntries();
        // await this.loadFiles();
      }
    });

    this.route.paramMap.subscribe((params) => {
      console.log('ROUTING!!!', params.get('id'));
      this.fileId = params.get('id');
      // this.breadcrumb.parentId = params.get('id');
      // this.id.set(params.get('id')!);
    });

    // this.route.children.forEach((child) => {
    //   child.paramMap.subscribe((params) => {
    //     console.log('CHILD ROUTING!!!', params.get('id'));
    //     // this.id.set(params.get('id')!);
    //   });
    // });

    // this.layout.disableNavigation();

    // this.layout.addAction({
    //   name: 'New File',
    //   icon: 'upload_file',
    //   action: () => {
    //     this.editFile({
    //       data: {
    //         title: '',
    //         body: '',
    //         background: '',
    //         collaborators: [],
    //         labels: [],
    //       },
    //     });
    //   },
    // });

    // this.layout.addAction({
    //   name: 'New Folder',
    //   icon: 'create_new_folder',
    //   action: () => {
    //     this.editFolder({
    //       data: {
    //         name: 'Untitled folder',
    //         // body: '',
    //         // background: '',
    //         // collaborators: [],
    //         // labels: [],
    //       },
    //     });
    //   },
    // });

    // this.fileService.registerActions(this.layout);

    // effect(async () => {
    //   if (this.app.initialized()) {
    //     await this.loadFolders();
    //     await this.loadFiles();
    //   }
    // });
  }

  fullscreen = signal<boolean>(false);

  toggleFullscreen() {
    var elem = document.getElementById('file-viewer') as any;

    if (!this.fullscreen()) {
      elem.requestFullscreen();
      this.fullscreen.set(true);
    } else {
      document.exitFullscreen();
      this.fullscreen.set(false);
    }
  }

  download() {
    // Step 1: Create a Blob object with the data you want to save
    // const data = new Blob(['Hello, world!'], { type: 'text/plain' });

    // TODO: Investigate if we should store Blob or ObjectURL on the component.

    // Step 2: Create a URL for the Blob
    const url = URL.createObjectURL(this.fileUrl);

    // Step 3: Create an anchor element
    const a = document.createElement('a');
    console.log('File URL');
    console.log(url);
    a.href = url;

    // Step 4: Set the download attribute with a filename
    a.download = this.data.name;

    // Step 5: Programmatically click the anchor element to trigger the download
    a.click();

    // Step 6: Revoke the Blob URL to free up memory
    URL.revokeObjectURL(url);
  }

  fileMimeType = FileMimeType;
  src?: string | Blob | SafeResourceUrl;
  type!: FileMimeType | string;
  pdfZoom = 1;

  pdfZoomIn(): void {
    this.pdfZoom++;
  }

  pdfZoomOut(): void {
    if (this.pdfZoom > 1) {
      this.pdfZoom--;
    }
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
          schema: fileDefinition.types.entry.schema,
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
        schema: fileDefinition.types.entry.schema,
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

  private fileUrl: any;
  private data: any;

  async deleteFile() {
    const { status: deleteStatus } = await this.record!.delete();

    // send the delete request to the remote DWN
    const { status: deleteSendStatus } = await this.record!.send(this.identity.did);

    console.log('Delete status:', deleteStatus);
    console.log('Delete send status:', deleteSendStatus);

    // this.record?.parentId
    // this.router.navigate(['app', 'files', 'folder', '']);

    this.record = undefined;
    this.src = undefined;

    this.navigation.back();
  }

  async loadEntries(tags?: any) {
    console.log('VALUE OF TAGS:', tags);

    if (!this.fileId) {
      return;
    }

    // const { record } = await this.identity.web5.dwn.records.read({
    //   message: {
    //     filter: {
    //       recordId: this.fileId,
    //     },
    //   },
    // });

    // First get file metadata.
    // const data = await record.data.json();
    // this.data = data;

    const { record: recordAttachment } = await this.identity.web5.dwn.records.read({
      message: {
        filter: {
          recordId: this.fileId,
        },
      },
    });

    this.record = recordAttachment;

    // Second get file binary data.
    this.fileUrl = await recordAttachment.data.blob();

    // console.log(record);
    console.log(recordAttachment);

    // const blob = await record.data.blob();
    // const blob = new Blob(['foo']);
    this.type = recordAttachment.dataFormat;

    if (recordAttachment.dataFormat === 'application/pdf') {
      const url = URL.createObjectURL(this.fileUrl) + '#toolbar=0&navpanes=0&scrollbar=0&view=FitH';
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      const url = URL.createObjectURL(this.fileUrl);
      this.src = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // console.log(url);
    // const retrieved = URL.getFromObjectURL(url);

    // var { records } = await this.identity.web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       protocol: fileDefinition.protocol,
    //       protocolPath: 'entry',
    //       schema: fileDefinition.types.entry.schema,
    //       dataFormat: fileDefinition.types.entry.dataFormats[0],
    //     },
    //   },
    // });

    // //     let json = {};
    // // let recordEntry = null;

    // this.entries.set([]);

    // if (records) {
    //   // Loop through returned records and print text from each
    //   for (const record of records) {
    //     let data = await record.data.json();
    //     let json: any = { record: record, data: data };

    //     // if (record.author == this.identity.did) {
    //     //   json.direction = 'out';
    //     // }

    //     this.entries.update((records) => [...records, json]);
    //   }
    // }

    // console.log('All requests:', this.entries());
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
