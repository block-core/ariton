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
import { StorageService } from '../storage.service';
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
  ],
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);

  private storage = inject(StorageService);

  public identity = inject(IdentityService);

  public updateService = inject(NewVersionCheckerService);

  public profileService = inject(ProfileService);

  public layout = inject(LayoutService);

  private navigation = inject(NavigationService);

  dialog = inject(MatDialog);

  private router = inject(Router);

  rootRoutes = routes.filter((r) => r.path).filter((r) => r.data && r.data['hide'] != true);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 700px)').pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  private debounceTimer: any;

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
    if (value.includes(':')) {
      this.router.navigate(['/profile', value]);
    } else {
      this.router.navigate(['/search'], { queryParams: { query: value } });
    }
  }

  async wipe() {
    // Clear all data from localStorage
    this.storage.clear();

    console.log('Local storage data has been wiped!');

    // Clear all data from IndexedDb
    await indexedDB.deleteDatabase('level-js-DATA/AGENT');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DID_RESOLVERCACHE');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_DATASTORE');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_EVENTLOG');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_MESSAGEINDEX');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/DWN_MESSAGESTORE');
    await indexedDB.deleteDatabase('level-js-DATA/AGENT/VAULT_STORE');

    console.log('Data has been wiped!');

    window.location.reload();
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
