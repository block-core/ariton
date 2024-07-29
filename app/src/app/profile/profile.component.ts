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
import { message, profile } from '../../protocols';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import * as QRCode from 'qrcode';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QRCodeDialogComponent } from '../shared/dialog/qrcode-dialog/qrcode-dialog.component';
import { AppService } from '../app.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileService = inject(ProfileService);

  identity = inject(IdentityService);

  app = inject(AppService);

  data = signal<any>(undefined);

  avatarSrc: any = null;

  ngOnDestroy() {
    URL.revokeObjectURL(this.avatarSrc);
  }

  constructor(
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) {
    effect(() => {
      if (this.app.initialized()) {
        this.route.paramMap.subscribe((params) => {
          const userId = params.get('id'); // Assuming 'id' is the name of the route parameter
          if (userId) {
            console.log('USER ID SET!!', userId);
            this.loadUserProfile(userId);
          }
        });
      }
    });
  }

  async ngOnInit() {}

  async loadData() {}

  async addFriend(did: string) {
    console.log('TARGET DID 1:', this.profileService.selected().did);
    console.log('TARGET DID 2:', this.profileService.current().did);
    console.log('AUTHOR DID:', this.identity.did);
    console.log('INPUT DID:', did);

    const { status: requestCreateStatus, record: messageRecord } = await this.identity.web5.dwn.records.create({
      data: { message: 'I want to be your friend.' },
      message: {
        recipient: this.profileService.selected().did,
        protocol: message.uri,
        protocolPath: 'request',
        schema: 'https://schema.ariton.app/message/schema/request',
        dataFormat: 'application/json',
      },
    });

    console.log('Request create status:', requestCreateStatus);

    const { status: requestStatus } = await messageRecord!.send(this.profileService.selected().did);

    if (requestStatus.code !== 202) {
      this.openSnackBar(`Friend request failed.Code: ${requestStatus.code}, Details: ${requestStatus.detail}.`);
    } else {
      this.openSnackBar('Friend request sent');
    }
  }

  private async loadUserProfile(userId: string) {
    const profile = await this.profileService.loadProfile(userId);
    this.data.set(profile);

    console.log(profile);
    console.log('PROFILE SET!!!');

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

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }

  async copyDID(did: string) {
    try {
      await navigator.clipboard.writeText(did);
      this.openSnackBar('DID copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  showQR(did: string) {
    this.dialog.open(QRCodeDialogComponent, {
      data: { did: did },
    });
  }

  async shareProfile(did: string) {
    const title = 'SondreB (Voluntaryist)';
    const url = document.location.href;
    const text = 'Check out this profile on Ariton';

    try {
      await navigator.share({
        title,
        url,
        text,
      });

      this.openSnackBar('Thanks for sharing!');
    } catch (err) {
      this.openSnackBar(`Couldn't share ${err}`);
    }
  }
}
