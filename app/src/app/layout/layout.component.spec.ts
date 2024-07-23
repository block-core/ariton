import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutComponent } from './layout.component';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { DidPipe } from '../shared/pipes/did.pipe';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ServiceWorkerModule } from '@angular/service-worker';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
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
        ServiceWorkerModule.register('', { enabled: false }),
      ],
      providers: [provideRouter([])],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
