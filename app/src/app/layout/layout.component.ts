import { Component, effect, inject, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../app.routes';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { LayoutService } from '../layout.service';
import { MatMenuModule } from '@angular/material/menu';
import { LocalStorageService } from '../local-storage.service';
import { IdentityService } from '../identity.service';
import { NewVersionCheckerService } from '../update.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Location } from '@angular/common';
import { NavigationService } from '../navigation.service';
import { DidPipe } from '../shared/pipes/did.pipe';
import { ProfileService } from '../profile.service';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { QRCodeScanDialogComponent } from '../shared/dialog/qrcode-scan-dialog/qrcode-scan-dialog.component';
import { AppService } from '../app.service';
import { NotificationEvent, NotificationService } from '../notification.service';
import { AgoPipe } from '../shared/pipes/ago.pipe';
import { PlayerControlsComponent } from '../apps/app/player/controls/controls.component';
import { QRCodeDialogComponent } from '../shared/dialog/qrcode-dialog/qrcode-dialog.component';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
    MatDialogModule,
    ZXingScannerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    SafeUrlPipe,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
    ThemeToggleComponent,
    MatTooltipModule,
    DidPipe,
    AgoPipe,
    PlayerControlsComponent,
  ],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  private localStorage = inject(LocalStorageService);

  private storage = inject(StorageService);

  public identity = inject(IdentityService);

  public updateService = inject(NewVersionCheckerService);

  public profileService = inject(ProfileService);

  private app = inject(AppService);

  public layout = inject(LayoutService);

  private navigation = inject(NavigationService);

  private notification = inject(NotificationService);

  dialog = inject(MatDialog);

  private router = inject(Router);

  rootRoutes = routes.filter((r) => r.path).filter((r) => r.data && r.data['hide'] != true);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 700px)').pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  private debounceTimer: any;

  public notifications = signal<NotificationEvent[]>([]);

  constructor() {
    // this.wipe();
    effect(async () => {
      if (this.app.initialized()) {
        // this.wipe();
        await this.loadNotifications();
      }
    });
  }

  async changeAccount(did: string) {
    this.identity.changeAccount(did);

    this.router.navigate(['/introduction']);
  }

  async loadNotifications() {
    const notifications = await this.notification.load();
    this.notifications.set(notifications);
  }

  async copyDID(did: string) {
    try {
      await navigator.clipboard.writeText(did);
      this.app.openSnackBar('Your DID copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  qrScan() {
    const dialogRef = this.dialog.open(QRCodeScanDialogComponent, {
      data: { did: '' },
      width: '100vw',
      height: '100vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.router.navigate(['/profile', result]);
    });
  }

  onSearchInput(event: any) {
    if (event.target.value === null) {
      clearTimeout(this.debounceTimer);
      return;
    }

    // Debounce logic to wait until user finishes typing
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      console.log('Handle search called!');
      this.handleSearch(event.target.value);
    }, 750);
  }

  private handleSearch(value: string): void {
    if (!value) {
      return;
    }

    if (value.includes(':')) {
      this.router.navigate(['/profile', value]);
    } else {
      this.router.navigate(['/search'], { queryParams: { query: value } });
    }
  }

  showQR(did: string) {
    this.dialog.open(QRCodeDialogComponent, {
      data: { did: did },
    });
  }

  async wipe() {
    await this.app.wipe();
  }

  applyUpdate(): void {
    this.updateService.applyUpdate();
  }

  lock() {
    this.identity.lock();
  }

  navigateBack() {
    this.navigation.back();
  }

  collapsed = signal<boolean>(false);

  collapseToggle() {
    this.collapsed.set(!this.collapsed());
  }
}
