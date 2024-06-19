import { Component, effect, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Record } from '@web5/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';

/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-data-management',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTreeModule
  ],
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.scss',
})
export class DataManagementComponent {
  record = signal<any>(null);

  records = signal<Record[]>([]);

  
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;


  constructor(private identityService: IdentityService) {
    effect(() => {
      console.log('Identity Service initialized.', this.identityService.initialized());
      this.load();
    });

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = files;
  }

  
  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number): FlatTreeNode {
    return {
      name: node.name,
      type: node.type,
      level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode): FileNode[] | null | undefined {
    return node.children;
  }
  

  async load() {
    // Filterable Record Properties
    // recipient, protocol, protocolPath, contextId, schema, recordId, parentId, dataFormat, dateCreated
    // SORTING: createdAscending, createdDescending, publshedAscending, publishedDescending

    const { protocols } = await this.identityService.web5.dwn.protocols.query({
      message: {
        filter: {
          protocol: 'https://music.org/protocol',
        },
      },
    });

    console.log(protocols);

    var { records } = await this.identityService.web5.dwn.records.query({
      message: {
        filter: {
          dataFormat: 'application/json',
        },
      },
    });

    console.log('All records:');
    console.log(records);

    if (records) {
      this.records.set(records);
    }

    var { records } = await this.identityService.web5.dwn.records.query({
      from: this.identityService.did,
      message: {
        filter: {
          schema: 'https://schema.org/Playlist',
          dataFormat: 'application/json',
        },
      },
    });

    console.log(records);

    const response = await this.identityService.web5.dwn.records.query({
      message: {
        filter: {
          parentId:
            'bafyreianzpmhbgcgam5mys722vnsiuwn7y4ek6kjeyjptttquasw4hge2m',
        },
      },
    });

    console.log(response.records);

    var { records } = await this.identityService.web5.dwn.records.query({
      message: {
        filter: {
          protocol: 'https://playlist.org/protocol',
          protocolPath: 'playlist/video',
        },
      },
    });

    console.log(records);
  }

  async createRecord(publish: boolean) {
    // Create a JSON record
    var { record } = await this.identityService.web5.dwn.records.create({
      data: {
        content: 'Hello Web5',
        description: 'Keep Building!',
        tags: ['web5', 'ariton', 'did'],
      },
      message: {
        dataFormat: 'application/json',
        published: publish,
      },
    });

    console.log(record);

    var { record } = await this.identityService.web5.dwn.records.create({
      data: 'this record will be written to the local DWN',
      message: {
        dataFormat: 'text/plain',
      },
    });

    console.log(record);
  }

  async updateRecord() {
    // Create a new version of the record based on the original record
    /*  const { record: newVersionRecord } = await this.identityService.web5.dwn.records.createFrom({
                 record: this.record,
                 data: 'I am a new version of the original record!',
                 message: {
                 dataFormat: 'text/plain',
                 published: true,
                 },
             }); */
  }
}
