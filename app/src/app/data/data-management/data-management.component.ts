import { Component, effect, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../../identity.service';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DwnApi, Record } from '@web5/api';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeModule } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { SizePipe } from '../../shared/pipes/size.pipe';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { community } from '../../../protocols';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatTreeModule,
    SizePipe,
  ],
  templateUrl: './data-management.component.html',
  styleUrl: './data-management.component.scss',
  providers: [SizePipe],
})
export class DataManagementComponent {
  protected readonly didInput = signal('');

  snackBar = inject(MatSnackBar);

  protected onInput(event: Event) {
    this.didInput.set((event.target as HTMLInputElement).value);
  }

  async createRoleAssignment() {
    // Alice creates a role-based 'friend' record, updates it, then sends it to her remote DWN.
    const { status: friendCreateStatus, record: friendRecord } = await this.identityService.web5.dwn.records.create({
      data: 'test',
      message: {
        recipient: this.didInput(),
        protocol: community.uri,
        protocolPath: 'friend',
        schema: 'https://schema.ariton.app/community/schema/friend',
        dataFormat: 'text/plain',
      },
    });

    // If multiple records of same role is attempted to be made, it will result in this error:
    // "ProtocolAuthorizationDuplicateRoleRecipient: DID 'did:dht:y31q7b9acubm9r7cgnpyef3db1st97smsrgamsjfshf1gictromo' is already recipient of a role record at protocol path 'friend under the parent context ."

    console.log('Assingment made', friendCreateStatus);
    console.log('Assingment record', friendRecord);
  }

  async createDataRequiringRoleAssignment() {
    // Bob creates an album record using the role 'friend' and sends it to Alice
    const { status: albumCreateStatus, record: albumRecord } = await this.identityService.web5.dwn.records.create({
      data: 'test',
      message: {
        recipient: this.didInput(),
        protocol: community.uri,
        protocolPath: 'album',
        protocolRole: 'friend',
        schema: 'https://schema.ariton.app/community/schema/album',
        dataFormat: 'text/plain',
      },
    });

    console.log('Album create', albumCreateStatus);

    if (albumRecord) {
      const { status: albumSendStatus } = await albumRecord.send(this.didInput());
      console.log('Status from external write:', albumSendStatus);

      if (albumSendStatus.code == 401) {
        this.snackBar.open(albumSendStatus.detail, 'Close', {
          duration: 3000,
        });
      }

      // When attempting to write to external DWN without protocol installed, this error will come:
      // "ProtocolAuthorizationProtocolNotFound: unable to find protocol definition for https://schema.ariton.app/community/entry"
    }
  }

  albums = signal<string>('');

  async listAlbums() {
    var { records } = await this.identityService.web5.dwn.records.query({
      message: {
        filter: {
          protocol: community.uri,
        },
      },
    });

    console.log('All records:');
    console.log(records);

    this.albums.set(JSON.stringify(records));
  }

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
      if (this.identityService.initialized()) {
        this.load();
      }
    });

    this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel, this.isExpandable, this.getChildren);

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
      expandable: !!node.children,
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
          protocol: 'https://social-media.xyz',
        },
      },
    });

    console.log(protocols);

    // var { records } = await this.identityService.web5.dwn.records.query({
    //   message: {
    //     filter: {
    //       dataFormat: 'application/json',
    //     },
    //   },
    // });

    var { records } = await this.identityService.web5.dwn.records.query({
      message: {
        filter: {
          protocol: 'https://social-media.xyz',
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
          parentId: 'bafyreianzpmhbgcgam5mys722vnsiuwn7y4ek6kjeyjptttquasw4hge2m',
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

  async registerChatProtocol() {
    const protocolDefinition = {
      protocol: 'https://social-media.xyz',
      published: true,
      types: {
        post: {
          schema: 'https://social-media.xyz/schemas/postSchema',
          dataFormats: ['text/plain'],
        },
        reply: {
          schema: 'https://social-media.xyz/schemas/replySchema',
          dataFormats: ['text/plain'],
        },
        image: {
          dataFormats: ['image/jpeg'],
        },
        caption: {
          schema: 'https://social-media.xyz/schemas/captionSchema',
          dataFormats: ['text/plain'],
        },
      },
      structure: {
        post: {
          $actions: [
            {
              who: 'anyone',
              can: ['create', 'read'],
            },
          ],
          reply: {
            $actions: [
              {
                who: 'recipient',
                of: 'post',
                can: ['create'],
              },
              {
                who: 'author',
                of: 'post',
                can: ['create'],
              },
            ],
          },
        },
        image: {
          $actions: [
            {
              who: 'anyone',
              can: ['create', 'read'],
            },
          ],
          caption: {
            $actions: [
              {
                who: 'anyone',
                can: ['read'],
              },
              {
                who: 'author',
                of: 'image',
                can: ['create'],
              },
            ],
          },
          reply: {
            $actions: [
              {
                who: 'author',
                of: 'image',
                can: ['read'],
              },
              {
                who: 'recipient',
                of: 'image',
                can: ['create'],
              },
            ],
          },
        },
      },
    };

    const { protocol, status } = await this.identityService.web5.dwn.protocols.configure({
      message: {
        definition: protocolDefinition,
      },
    });

    if (status.code === 202) {
      // 'Accepted''
      console.log('Protocol accepted');
    }

    console.log(protocol);
    console.log(status);

    if (protocol) {
      //sends protocol to remote DWNs immediately (vs waiting for sync)
      const { status } = await protocol.send('did:dht:83azq4wzkghcacu4mt57ne8d5gumnytxxjkpmn5h1shwkafzi5so');

      if (status.code === 202) {
        console.log('Protocol sent to remote DWNs');
      } else {
        console.error(`Failed to send protocol to remote DWNs. Code: ${status.detail}, Detail: ${status.detail}`);
      }
    }
  }

  async createChatRecord() {
    const { record: postRecord, status: createStatus } = await this.identityService.web5.dwn.records.create({
      data: 'Hey this is my first post!',
      message: {
        recipient: 'did:dht:83azq4wzkghcacu4mt57ne8d5gumnytxxjkpmn5h1shwkafzi5so',
        schema: 'https://social-media.xyz/schemas/postSchema',
        dataFormat: 'text/plain',
        protocol: 'https://social-media.xyz',
        protocolPath: 'post',
      },
    });

    // const { record: postRecord, status: createStatus } =
    //   await this.identityService.web5.dwn.records.create({
    //     data: {
    //       content: 'Hey this is my first post!',
    //       tags: ['web5', 'ariton', 'did'],
    //     },
    //     message: {
    //       recipient:
    //         'did:dht:83azq4wzkghcacu4mt57ne8d5gumnytxxjkpmn5h1shwkafzi5so',
    //       schema: 'message',
    //       dataFormat: 'text/json',
    //       protocol: 'http://chat-protocol.xyz',
    //       protocolPath: 'message',
    //     },
    //   });

    if (createStatus.code === 202) {
      console.log('Record created successfully!');
    } else {
      console.error(`Failed to create record. Code: ${createStatus.detail}, Detail: ${createStatus.detail}`);
    }

    console.log(postRecord);

    // var { record } = await this.identityService.web5.dwn.records.create({
    //   data: 'this record will be written to the local DWN',
    //   message: {
    //     dataFormat: 'text/plain',
    //   },
    // });

    // console.log(record);
  }

  async createRegistry() {
    // var { record } = await this.identityService.web5.dwn.records.create({
    //     data: {
    //         name: 'Liberstad CC',
    //         description: 'Crypto Company Registry',
    //         tags: ['registry', 'did', 'liberstad'],
    //     },
    //     message: {
    //         dataFormat: 'application/json',
    //         schema: 'https://schema.ariton.app/registry',
    //         published: true,
    //     },
    // });
    // console.log(record);
    // if (record) {
    //     const { status: sendStatus } = await record.send('did:dht:r9pc5egfoa6isk3ueocrbmt7wigkjdnrfjd5dj35crbo5oesueuy');
    //     console.log(sendStatus);
    // }
    // var { record } = await this.identityService.web5.dwn.records.create({
    //     data: {
    //         name: 'Blockchain Social Network (BSN)',
    //         description: 'Stellar blockchain data registry',
    //         tags: ['registry', 'did', 'stellar', 'mtl', 'montelibero'],
    //     },
    //     message: {
    //         dataFormat: 'application/json',
    //         schema: 'https://schema.ariton.app/registry',
    //         published: true,
    //     },
    // });
    // console.log(record);
    // if (record) {
    //     const { status: sendStatus } = await record.send('did:dht:r9pc5egfoa6isk3ueocrbmt7wigkjdnrfjd5dj35crbo5oesueuy');
    //     console.log(sendStatus);
    // }
  }

  async readRegistries() {
    // var dwn = new DwnApi({ agent: this.identityService.web5.agent, connectedDid: 'did:dht:wd9fc1mn4s5yx7izbgm3zqpnpgzsbmepu8og1y5etyfm8wojbjcy' }););
    // var { records } = await this.identityService.web5.dwn.records.query({
    //     message: { filter: { schema: 'https://schema.ariton.app/registry' } },
    // });
    // console.log(records);
    // var { records } = await this.identityService.web5.dwn.records.query({
    //   from: 'did:dht:r9pc5egfoa6isk3ueocrbmt7wigkjdnrfjd5dj35crbo5oesueuy',
    //   message: {
    //     filter: {
    //       schema: 'https://schema.ariton.app/registry',
    //     },
    //   },
    // });
    // console.log(records);
    // if (records) {
    //   this.records.set(records);
    // }
  }

  async createRecord(publish: boolean) {
    // Create a JSON record
    var { record } = await this.identityService.web5.dwn.records.create({
      data: {
        content: 'Hello Web5 child!',
        description: 'Keep Building child!',
        tags: ['web5', 'ariton', 'did'],
      },
      message: {
        dataFormat: 'application/json',
        published: publish,
        protocolPath: 'playlist/video',
        parentContextId: 'bafyreicvvzlgrovmwhoi6snnsiuvgs5eucy4f766vkfgb6sfcqveth5nhy',
      },
    });

    console.log(record);

    // var { record } = await this.identityService.web5.dwn.records.create({
    //   data: 'this record will be written to the local DWN',
    //   message: {
    //     dataFormat: 'text/plain',
    //   },
    // });

    // console.log(record);
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
