import { Component, effect, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { routes } from '../app.routes';
import { RouterLink, RouterLinkActive } from '@angular/router';
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

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  standalone: true,
  imports: [
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

  public layout = inject(LayoutService);

  private navigation = inject(NavigationService);

  rootRoutes = routes.filter((r) => r.path).filter((r) => r.data && r.data['hide'] != true);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 700px)').pipe(
    map((result) => result.matches),
    shareReplay(),
  );

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
}
