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

@Component({
  selector: 'app-files',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, AgoPipe],
  templateUrl: './files.component.html',
  styleUrl: './files.component.scss',
})
export class FilesComponent {
  app = inject(AppService);
  layout = inject(LayoutService);
  identity = inject(IdentityService);
  dialog = inject(MatDialog);

  folders = signal<any[]>([]);
  files = signal<any[]>([]);

  constructor() {
    this.layout.disableNavigation();
    this.layout.addAction({
      name: 'New File',
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
      name: 'New Folder',
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

    effect(async () => {
      if (this.app.initialized()) {
        await this.loadFolders();
        await this.loadFiles();
      }
    });
  }

  async editFile(data: any) {}

  async editFolder(entry: any) {
    let data: DialogData = {
      name: entry.data.name,
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
          // tags: {
          //   labels: data.labels,
          // },
          protocol: fileDefinition.protocol,
          protocolPath: 'folder',
          schema: fileDefinition.types.folder.schema,
          dataFormat: fileDefinition.types.folder.dataFormats[0],
        },
      });

      console.log('Record created:', record);
      console.log('Record status:', status);

      if (record) {
        entry.record = record;
        this.folders.update((records) => [...records, entry]);
      }
    }
  }

  async loadFolders(tags?: any) {
    console.log('VALUE OF TAGS:', tags);

    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: fileDefinition.protocol,
          schema: fileDefinition.types.folder.schema,
          dataFormat: fileDefinition.types.folder.dataFormats[0],
        },
      },
    });

    //     let json = {};
    // let recordEntry = null;

    this.folders.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        // if (record.author == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.folders.update((records) => [...records, json]);
      }
    }

    console.log('All requests:', this.folders());
  }

  async loadFiles(tags?: any) {
    console.log('VALUE OF TAGS:', tags);

    var { records } = await this.identity.web5.dwn.records.query({
      message: {
        filter: {
          protocol: fileDefinition.protocol,
          schema: fileDefinition.types.file.schema,
          dataFormat: fileDefinition.types.file.dataFormats[0],
        },
      },
    });

    //     let json = {};
    // let recordEntry = null;

    this.files.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        // if (record.author == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.files.update((records) => [...records, json]);
      }
    }

    console.log('All requests:', this.files());
  }
}
