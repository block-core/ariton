import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../profile.service';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../identity.service';
import { credential, message, profile } from '../../protocols';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import * as QRCode from 'qrcode';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QRCodeDialogComponent } from '../shared/dialog/qrcode-dialog/qrcode-dialog.component';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { protocolDefinition as messageDefinition } from '../../protocols/message';
import { protocolDefinition as postDefinition } from '../../protocols/post';
import { VerifiableCredential } from '@web5/credentials';
import { BearerDid } from '@web5/dids';
import { LayoutService } from '../layout.service';
import { FriendService } from '../friend.service';
import { ConnectionService } from '../connection.service';
import { MatCardModule } from '@angular/material/card';
import { DialogData, PostDialogComponent } from './post-dialog.component';
import { ProfileHeaderComponent } from '../shared/components/profile-header/profile-header.component';
import { AgoPipe } from '../shared/pipes/ago.pipe';
import { DwnDateSort } from '@web5/agent';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    QRCodeDialogComponent,
    MatDialogModule,
    SafeUrlPipe,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatDividerModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ProfileHeaderComponent,
    AgoPipe,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  posts = signal<any[]>([]);

  profileService = inject(ProfileService);

  identity = inject(IdentityService);

  connection = inject(ConnectionService);

  app = inject(AppService);

  layout = inject(LayoutService);

  friend = inject(FriendService);

  dialog = inject(MatDialog);

  data = signal<any>(undefined);

  avatarSrc: any = null;

  did!: string;

  ngOnDestroy() {
    URL.revokeObjectURL(this.avatarSrc);
  }

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.layout.marginOff();

    effect(async () => {
      if (this.app.initialized()) {
        this.route.paramMap.subscribe(async (params) => {
          const userId = params.get('id'); // Assuming 'id' is the name of the route parameter

          if (userId && userId !== 'undefined') {
            this.did = userId!;
            console.log('USER ID SET!!', userId);
            await this.loadPosts(userId);
            this.loadUserProfile(userId);
          }
        });
      }
    });
  }

  async loadPosts(did: string) {
    const query = {
      from: did,
      message: {
        filter: {
          author: did,
          protocol: postDefinition.protocol,
          protocolPath: 'post',
          schema: postDefinition.types.post.schema,
          dataFormat: postDefinition.types.post.dataFormats[0],
        },
        dateSort: DwnDateSort.CreatedDescending,
      },
    };

    console.log('QUERY: ', query);

    var { records, status } = await this.identity.web5.dwn.records.query(query);

    this.posts.set([]);

    if (records) {
      // Loop through returned records and print text from each
      for (const record of records) {
        let data = await record.data.json();
        let json: any = { record: record, data: data };

        // if (record.creator == this.identity.did) {
        //   json.direction = 'out';
        // }

        this.posts.update((records) => [...records, json]);
      }
    }

    console.log('All posts:', this.posts());
  }

  newPost() {
    this.editPost({
      data: {
        title: '',
        body: '',
        background: '',
        collaborators: [],
        labels: [],
      },
    });
  }

  editPost(entry: any) {
    let data: DialogData = {
      title: entry.data.title,
      body: entry.data.body,
      background: entry.data.background,
      collaborators: [],
      labels: [''],
    };

    const original = JSON.parse(JSON.stringify(data));

    const dialogRef = this.dialog.open(PostDialogComponent, {
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

        await this.savePost(entry, data);

        // Update the data so it's displayed in the UI without re-query DWN.
        // TODO: Validate if this is actually needed since we copy above now.
        // this.records().find((r) => r.record == entry.record).data = data;
      }
    });

    return dialogRef.afterClosed();
  }

  async deletePost(entry: any) {
    const { status } = await entry.record.delete();

    if (status) {
      this.posts.update((records) => records.filter((r) => r.record != entry.record));
    }
  }

  async savePost(entry: any, data: DialogData) {
    // console.log('SAVE POST: ', entry, data);

    let tags = undefined;

    // Only set labels on tags if there is any data. It will crash to attempt to save label with empty array.
    if (data.labels && data.labels.length > 0) {
      tags = {
        labels: data.labels,
      };
    }

    if (entry.record) {
      const { status, record } = await entry.record.update({
        tags,
        data,
        published: true,
      });

      // console.log('Record status:', status);
    } else {
      const { record, status } = await this.identity.web5.dwn.records.create({
        data: data,
        message: {
          published: true, // Make the record public, so they can be queried and view by everyone.
          tags,
          protocol: postDefinition.protocol,
          protocolPath: 'post',
          schema: postDefinition.types.post.schema,
          dataFormat: postDefinition.types.post.dataFormats[0],
        },
      });

      // console.log('Record created:', record);
      // console.log('Record status:', status);

      if (record) {
        entry.record = record;
        this.posts.update((records) => [entry, ...records]);

        // Send the record to self DWN.
        await entry.record.send(this.identity.did);
      }
    }
  }

  async ngOnInit() {}

  async loadData() {}

  async addFriend(did: string) {
    const { record } = await this.friend.createRequest(did);
    this.app.openSnackBar('Friend request sent');
  }

  async block(did: string) {
    await this.connection.block(did);
  }

  private async loadUserProfile(userId: string) {
    try {
      const profile = await this.profileService.loadProfile(userId);
      this.data.set(profile);
    } catch (err) {
      console.error(err);
    }

    //let blob = new Blob([this.profileService.avatar()]);
    // console.log(this.profileService.avatar());

    // var imageUrl = URL.createObjectURL(this.profileService.avatar());

    // const reader = new FileReader();
    // reader.readAsDataURL(this.profileService.avatar());
    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   this.avatarSrc = reader.result;
    //   // result includes identifier 'data:image/png;base64,' plus the base64 data
    // };

    //this.avatarSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));

    // const reader = new FileReader();
    // reader.readAsDataURL(this.profileService.avatar());
    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   this.avatarSrc = reader.result;
    //   // result includes identifier 'data:image/png;base64,' plus the base64 data
    // };
  }

  // async copyDID(did: string) {
  //   try {
  //     await navigator.clipboard.writeText(did);
  //     this.app.openSnackBar('DID copied to clipboard');
  //   } catch (err) {
  //     console.error('Failed to copy: ', err);
  //   }
  // }

  async copyUrl(entry: any) {
    const url = `${document.location.origin}/profile/${entry.record.creator}/posts/${entry.record.id}`;

    try {
      await navigator.clipboard.writeText(url);
      this.app.openSnackBar('Url copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  showQR(did: string) {
    this.dialog.open(QRCodeDialogComponent, {
      data: { did: did },
    });
  }

  async shareProfile(profile: any) {
    const title = profile.profile.name;
    const url = document.location.href;
    const text = 'Check out this profile on Ariton';

    try {
      await navigator.share({
        title,
        url,
        text,
      });

      this.app.openSnackBar('Thanks for sharing!');
    } catch (err) {
      this.app.openSnackBar(`Couldn't share ${err}`);
    }
  }
}
