import { ChangeDetectorRef, Component, effect, inject, signal, ViewChild } from '@angular/core';
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
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  createUrlTreeFromSnapshot,
} from '@angular/router';
import { BreadcrumbService } from '../../../breadcrumb.service';
import { FileService } from '../../../file.service';
import { SizePipe } from '../../../shared/pipes/size.pipe';
import { DwnDateSort } from '@web5/agent';
import { Record } from '@web5/api';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

// export interface TableEntryInterface {
//   icon: string;
//   name: string;
//   modified: number;
//   size: number;
//   type: string;
//   entryType: string;
//   record: Record;
// }

export class TableEntry {
  icon: string;
  name: string | any;
  modified: number | any;
  size: number | any;
  type: string | any;
  entryType: string | any;
  record: Record;

  constructor(entry: Record) {
    this.icon = entry.tags['entryType'] == 'folder' ? 'folder' : 'note';
    this.name = entry.tags['name'];
    this.modified = entry.tags['entryType'] === 'folder' ? entry.dateModified : entry.tags['lastModified'];
    this.size = entry.tags['size'];
    this.type = entry.tags['type'];
    this.entryType = entry.tags['entryType'];
    this.record = entry;
  }
}

@Component({
  selector: 'app-folder',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    SizePipe,
    BreadcrumbComponent,
    CommonModule,
    MatListModule,
    MatIconModule,
    AgoPipe,
    BreadcrumbComponent,
  ],
  templateUrl: './folder.component.html',
  styleUrl: './folder.component.scss',
})
export class FolderComponent {
  entries = signal<Record[]>([]);
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
  parentId: string | undefined;
  contextId: string | undefined | null;
  protocolPath = 'entry';

  hasInitialized = false;
  routingSub: any;
  folderLevel = 1;

  displayedColumns: string[] = ['icon', 'name', 'modified', 'size'];
  dataSource = new MatTableDataSource<TableEntry>([]);

  @ViewChild(MatSort) sort!: MatSort;

  changeDetectorRefs = inject(ChangeDetectorRef);

  constructor() {
    this.layout.resetActions();

    effect(
      async () => {
        if (this.app.initialized()) {
          // TODO: See if we can have a better way to handle this, to avoid double loading of data.
          if (this.hasInitialized) {
            return;
          }

          const url = this.getResolvedUrl(this.route.snapshot);
          await this.processUrl(url);
        }
      },
      { allowSignalWrites: true },
    );

    effect(async () => {
      this.updateTable();
    });

    this.routingSub = this.router.events.subscribe(async (event) => {
      if (event instanceof NavigationEnd) {
        await this.processUrl(event.urlAfterRedirects);
      }
    });

    // this.route.firstChild!.params.subscribe((params) => {
    //   console.log('CHILD ROUTE:');
    //   console.log(params);
    // });

    // this.route.params.subscribe((params) => {
    //   console.log(params);
    // });

    // this.route.url.subscribe((params) => {
    //   console.log(params);
    // });

    // this.route.url.subscribe(([url]) => {
    //   const { path, parameters } = url;
    //   console.log('this.route.url', url);
    //   console.log(path); // e.g. /products
    //   console.log(parameters); // e.g. { id: 'x8klP0' }
    // });

    // this.route.paramMap.subscribe(async (params) => {
    //   console.log('PARAMS:', params);

    //   this.breadcrumb.parentId = params.get('id');
    //   this.parentId = params.get('id')!;

    //   console.log('PARENT ID:', this.parentId);
    //   console.log('ROUTING APP INITIALIZED?', this.app.initialized());

    //   // // If not initialized, ignore the routing event and loading will
    //   // // happen when ready.
    //   // if (!this.app.initialized()) {
    //   //   return;
    //   // }

    //   // // Indicate we have initialized this component and avoid double data loading on routing.
    //   // this.hasInitialized = true;

    //   // await this.loadEntries();
    // });

    // this.route.children.forEach((child) => {
    //   child.paramMap.subscribe((params) => {
    //     console.log('CHILD ROUTING!!!', params.get('id'));
    //     // this.id.set(params.get('id')!);
    //   });
    // });

    this.layout.disableNavigation();

    console.log('FOLDER COMPONENT INITIALIZED');

    // this.layout.setActions([
    //   {
    //     name: 'Upload files',
    //     icon: 'upload_file',
    //     action: () => {
    //       this.editFile({
    //         data: {
    //           title: '',
    //           body: '',
    //           background: '',
    //           collaborators: [],
    //           labels: [],
    //         },
    //       });
    //     },
    //   },
    //   {
    //     name: 'New folder',
    //     icon: 'create_new_folder',
    //     action: () => {
    //       this.editFolder(null);
    //     },
    //   },
    // ]);

    // this.fileService.registerActions(this.layout);

    // effect(async () => {
    //   if (this.app.initialized()) {
    //     await this.loadFolders();
    //     await this.loadFiles();
    //   }
    // });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  updateTable() {
    this.dataSource.data = this.entries().map((entry) => new TableEntry(entry));
    // this.dataSource.data = this.entries();
  }

  sortData(sort: Sort) {
    // const data = this.entries();
    // if (!sort.active || sort.direction === '') {
    //   this.dataSource.data = data;
    //   return;
    // }
    // this.dataSource.data = data.sort((a, b) => {
    //   const isAsc = sort.direction === 'asc';
    //   switch (sort.active) {
    //     case 'name':
    //       return compare(a.name, b.name, isAsc);
    //     case 'calories':
    //       return compare(a.calories, b.calories, isAsc);
    //     case 'fat':
    //       return compare(a.fat, b.fat, isAsc);
    //     case 'carbs':
    //       return compare(a.carbs, b.carbs, isAsc);
    //     case 'protein':
    //       return compare(a.protein, b.protein, isAsc);
    //     default:
    //       return 0;
    //   }
    // });
  }

  announceSortChange(sortState: Sort) {}

  getValueAfterFolder(url: string): string | null {
    const match = url.match(/\/folder\/(.+)/);
    return match ? match[1] : null;
  }

  generateUrl(x: number): string {
    const entries = [];
    for (let i = 0; i < x; i++) {
      entries.push('entry');
    }
    return entries.join('/');
  }

  async processUrl(url: string) {
    console.log('PROCESS URL:', url);

    if (url.endsWith('root')) {
      console.log('ROOT!!!');

      this.parentId = 'root';
      this.protocolPath = 'entry';

      // When at root, reset the contextId.
      this.contextId = undefined;

      this.folderLevel = 1;
    } else {
      console.log('ELSE!!!');
      console.log('URL:', url);

      const valueAfterFolder = this.getValueAfterFolder(url);
      console.log('valueAfterFolder:', valueAfterFolder);

      const urlSegments = url.split('/');
      const lastSegment = urlSegments[urlSegments.length - 1];
      console.log('lastSegment:', lastSegment);

      // Parent ID is always the last segment.
      this.parentId = lastSegment;

      // Set the contextId used to query the entries.
      this.contextId = valueAfterFolder;

      let slashCount = 0;

      // If there are nothing in URL after folder, we are at level 1.
      if (!valueAfterFolder) {
        slashCount = 1;
      } else {
        slashCount = (valueAfterFolder!.match(/\//g) || []).length + 2;
        console.log('SLASHCOUNT:', slashCount);
      }

      this.folderLevel = slashCount;

      // We add 2 here because we are not on root but second level.
      this.protocolPath = this.generateUrl(slashCount);
      console.log('GENERATED PROTOCOL PATH:', this.protocolPath);

      // TODO: Need a more optimal way to disable new folder when level 5 is reached.
      // if (this.folderLevel === 4) {
      //   this.layout.setActions([
      //     {
      //       name: 'Upload files',
      //       icon: 'upload_file',
      //       action: () => {
      //         this.editFile({
      //           data: {
      //             title: '',
      //             body: '',
      //             background: '',
      //             collaborators: [],
      //             labels: [],
      //           },
      //         });
      //       },
      //     },
      //     {
      //       name: 'Delete folder',
      //       icon: 'delete_forever',
      //       action: () => {
      //         this.deleteFolder();
      //       },
      //     },
      //   ]);
      // } else if (this.folderLevel > 1) {
      //   this.layout.setActions([
      //     {
      //       name: 'Upload files',
      //       icon: 'upload_file',
      //       action: () => {
      //         this.editFile({
      //           data: {
      //             title: '',
      //             body: '',
      //             background: '',
      //             collaborators: [],
      //             labels: [],
      //           },
      //         });
      //       },
      //     },
      //     {
      //       name: 'New folder',
      //       icon: 'create_new_folder',
      //       action: () => {
      //         this.editFolder(null);
      //       },
      //     },
      //     {
      //       name: 'Delete folder',
      //       icon: 'delete_forever',
      //       action: () => {
      //         this.deleteFolder();
      //       },
      //     },
      //   ]);
      // } else {
      //   this.layout.setActions([
      //     {
      //       name: 'Upload files',
      //       icon: 'upload_file',
      //       action: () => {
      //         this.editFile({
      //           data: {
      //             title: '',
      //             body: '',
      //             background: '',
      //             collaborators: [],
      //             labels: [],
      //           },
      //         });
      //       },
      //     },
      //     {
      //       name: 'New folder',
      //       icon: 'create_new_folder',
      //       action: () => {
      //         this.editFolder(null);
      //       },
      //     },
      //   ]);
      // }

      // /app/files/folder/bafyreiclhcf5afetlwz4hmpjqfqrqktp7qk3uywah6zroz52ipixuhprci
    }

    // If not initialized, ignore the routing event and loading will
    // happen when ready.
    if (!this.app.initialized()) {
      console.log('APP NOT INITIALIZED, RETURN!');
      return;
    }

    // Indicate we have initialized this component and avoid double data loading on routing.
    this.hasInitialized = true;

    console.log('SET INITIALIZED. LOADING ENTRIES!', this.hasInitialized);

    await this.loadEntries();
  }

  getResolvedUrl(route: ActivatedRouteSnapshot): string {
    let url = route.pathFromRoot.map((v) => v.url.map((segment) => segment.toString()).join('/')).join('/');
    const queryParam = route.queryParamMap;
    if (queryParam.keys.length > 0) {
      url +=
        '?' +
        queryParam.keys
          .map((key) =>
            queryParam
              .getAll(key)
              .map((value) => key + '=' + value)
              .join('&'),
          )
          .join('&');
    }
    return url;
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

  ngOnDestroy() {
    console.log('ON DESTROY!!!);');
    this.routingSub.unsubscribe();
    this.layout.resetActions();
  }

  // parentContextId: string | undefined;

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

      const query = {
        tags: {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          entryType: 'file',
        },
        protocol: fileDefinition.protocol,
        protocolPath: this.protocolPath,
        parentContextId: (this.contextId ??= undefined),
        schema: fileDefinition.types.entry.schema,
        dataFormat: blob.type,
      };

      console.log(query);

      // const file = event.currentTarget.files[0];
      const { status: fileStatus, record } = await this.identity.web5.dwn.records.create({
        data: blob,
        message: query,
      });

      console.log('Record created:', record);
      console.log('Record status:', fileStatus);

      // record?.contextId;

      // const message = {
      //   tags: {
      //     type: file.type, // Do we ever need to index and query on file types? Perhaps to find "PDF" files only?
      //     entryType: 'file',
      //     attachment: record!.id, // Store a reference to download the binary file.
      //     root: this.parentId ? false : true,
      //   },
      //   protocol: fileDefinition.protocol,
      //   protocolPath: 'entry',
      //   parentContextId: (this.parentId ??= undefined),
      //   schema: fileDefinition.types.entry.schema,
      // };

      // console.log('Data:', data);
      // console.log('Message:', message);

      // const { status: fileStatus2, record: record2 } = await this.identity.web5.dwn.records.create({
      //   data: data,
      //   message: message,
      // });

      // console.log('Record created:', record2);
      // console.log('Record status:', fileStatus2);

      if (record) {
        // const data = await record2.data.blob();
        // console.log(data);

        this.entries.update((records) => [...records, record]);
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

  async deleteFolder() {
    const { record } = await this.identity.web5.dwn.records.read({
      message: {
        filter: {
          recordId: this.parentId,
        },
      },
    });

    if (record) {
      const { status } = await record.delete({ prune: true });
      console.log('Delete status:', status);

      const parentPath = this.contextId!.split('/').slice(0, -1);
      console.log('Parent path:', parentPath);
      this.router.navigate(['app', 'files', 'folder', ...parentPath]);
      // this.router.navigate(['../']);
    }
  }

  async editFolderById(recordId: string) {
    const { record } = await this.identity.web5.dwn.records.read({
      message: {
        filter: {
          recordId: recordId,
        },
      },
    });

    await this.editFolder(record);
  }

  async editFolder(entry: Record | undefined | null) {
    let data: DialogData = {
      name: entry ? entry.tags['name'] : 'Untitled folder',
      entryType: 'folder',
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
        // entry.data = data;

        await this.saveFolder(entry, data);

        // Update the data so it's displayed in the UI without re-query DWN.
        // this.files().find((r) => r.record == entry.record).data = data;
      }
    });

    return dialogRef.afterClosed();
  }

  async saveFolder(entry: Record | undefined | null, data: DialogData) {
    if (entry) {
      // Will this work?
      entry.tags['name'] = data.name;
      entry.tags['entryType'] = data.entryType;

      const { status } = await entry.update({
        data: {},
      });

      console.log('Record status:', status);
    } else {
      // if (this.parentId) {
      //   const { record: parent } = await this.identity.web5.dwn.records.read({
      //     message: {
      //       filter: {
      //         recordId: this.parentId,
      //       },
      //     },
      //   });

      //   console.log('PARENT:', parent);

      //   this.contextId = parent?.contextId;
      // }

      const message: any = {
        tags: {
          name: data.name,
          entryType: data.entryType,
        },
        protocol: fileDefinition.protocol,
        protocolPath: this.protocolPath,
        parentContextId: (this.contextId ??= undefined),
        schema: fileDefinition.types.entry.schema,
      };

      console.log('Create folder:', message);

      const { record, status } = await this.identity.web5.dwn.records.create({
        data: {},
        message: message,
      });

      console.log('Record created:', record);
      console.log('Record status:', status);

      // const message2: any = {
      //   tags: {
      //     name: data.name,
      //     entryType: data.entryType,
      //   },
      //   protocol: fileDefinition.protocol,
      //   protocolPath: 'entry/entry',
      //   schema: fileDefinition.types.entry.schema,
      // };

      // // Set the parent.
      // message2.parentContextId = record?.contextId;

      // // Create new item:
      // const { record: record2, status: status2 } = await this.identity.web5.dwn.records.create({
      //   data: {},
      //   message: message2,
      // });

      // console.log('Record2 created:', record2);
      // console.log('Record2 status:', status2);

      if (record) {
        // entry.record = record;
        this.entries.update((records) => [...records, record]);
      }
    }
  }

  async openEntry(entry: TableEntry) {
    console.log(entry);
    if (entry.entryType === 'folder') {
      this.router.navigate(['/app/files/folder/' + entry.record.contextId]);
    } else {
      this.router.navigate(['/app/files/file/' + entry.record.id]);
    }
  }

  async loadEntries(tags?: any) {
    console.log('VALUE OF TAGS:', tags);
    console.log('PARENT ID:', this.parentId);

    // if (this.parentId === 'root') {
    //   this.parentContextId = undefined;
    //   this.protocolPath = 'entry';
    // } else {
    //   console.log('FINDING PARENT!!!');
    //   // Query for the parent context ID.
    //   const { record: parent } = await this.identity.web5.dwn.records.read({
    //     message: {
    //       filter: {
    //         recordId: this.parentId,
    //       },
    //     },
    //   });

    //   this.parentContextId = parent?.contextId;

    //   this.protocolPath = 'entry/entry';

    //   if (this.parentContextId.indexOf('/') > -1) {
    //     this.protocolPath = 'entry/entry';
    //   }
    // }

    console.log('PARENT CONTEXT ID:', this.contextId);

    const query: any = {
      filter: {
        protocolPath: this.protocolPath,
        protocol: fileDefinition.protocol,
        schema: fileDefinition.types.entry.schema,
        // parentId: (this.parentId ??= undefined),
        // parentId: (this.parentId ??= undefined),
      },
      dateSort: DwnDateSort.CreatedDescending,
    };

    if (this.parentId && this.parentId !== 'root') {
      query.filter.parentId = this.parentId;
    }

    console.log(query);

    var { records } = await this.identity.web5.dwn.records.query({
      message: query,
    });

    //     let json = {};
    // let recordEntry = null;

    this.entries.set(records ?? []);
    console.log('All entries:', this.entries());

    // this.dataSource.data = records! as any;

    // this.changeDetectorRefs.detectChanges();

    // console.log('Changed data source:', this.dataSource);

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
