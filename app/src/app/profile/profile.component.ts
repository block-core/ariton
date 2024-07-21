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
import { profile } from '../../protocols';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import * as QRCode from 'qrcode';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QRCodeDialogComponent } from '../shared/dialog/qrcode-dialog/qrcode-dialog.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [QRCodeDialogComponent, MatDialogModule, SafeUrlPipe, MatTabsModule, MatIconModule, MatButtonModule, MatMenuModule, RouterLink, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileService = inject(ProfileService);

  identity = inject(IdentityService);

  profile = signal<any>({});

  ngOnDestroy() {
    URL.revokeObjectURL(this.avatarSrc);
  }

  constructor(private dialog: MatDialog, private sanitizer: DomSanitizer, private _snackBar: MatSnackBar, private route: ActivatedRoute) {
    effect(() => {
      if (this.identity.initialized()) {
        this.route.paramMap.subscribe((params) => {
          const userId = params.get('id'); // Assuming 'id' is the name of the route parameter
          if (userId) {
            this.loadUserProfile(userId);
          }
        });
      }
    });
  }

  async ngOnInit() {}

  async loadData() {}

  avatarSrc: any = null;

  private async loadUserProfile(userId: string) {
    await this.profileService.openProfile(userId);

    //let blob = new Blob([this.profileService.avatar()]);
    // console.log(this.profileService.avatar());

    // var imageUrl = URL.createObjectURL(this.profileService.avatar());
    this.avatarSrc = this.profileService.avatar();

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

  async copyDID() {
    try {
      await navigator.clipboard.writeText(this.profileService.selected().did);
      this.openSnackBar('DID copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  showQR() {
    const did = this.profileService.selected().did;
    this.dialog.open(QRCodeDialogComponent, {
      data: { did: did },
    });
  }

  async shareProfile() {
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
