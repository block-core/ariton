import { APP_INITIALIZER, Component, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';
import { IdentityService } from './identity.service';
import { UnlockComponent } from './account/unlock/unlock.component';
import { AppService } from './app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { RestoreComponent } from './account/create/restore/restore.component';
import { OnboardingState } from './app.service';
import { HashService } from './hash.service';

export function initializeApp(hashService: HashService) {
  return (): Promise<void> => hashService.loadHash();
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RestoreComponent,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterOutlet,
    LayoutComponent,
    UnlockComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [HashService],
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' },
    },
  ],
})
export class AppComponent {
  title = 'app';
  appService = inject(AppService);
  previousUrl = '';

  constructor(private router: Router, private layout: LayoutService, public identityService: IdentityService) {
    // This must happen in the constructor on app component, or when loading in PWA, it won't
    // be possible to read the query parameters.
    const queryParam = globalThis.location.search;

    if (queryParam) {
      const param = Object.fromEntries(new URLSearchParams(queryParam)) as any;
      this.appService.params = param;
    }

    console.log(queryParam);
    console.log(this.appService.params);

    effect(() => {
      if (this.appService.initialized()) {
        console.log('App has been initialized!!!!');
      }
    });
  }

  forceClose() {
    // Force the initialized to be set to true. This can be useful when
    // the app load or creation has issues during the prototype/beta phases.
    this.appService.onboardingState.set(OnboardingState.Unlocked);
    this.appService.initialized.set(true);
  }

  restore = signal<boolean>(false);

  async restoreAccount() {
    this.restore.set(true);
  }

  back() {
    this.restore.set(false);
  }

  async createAccount() {
    console.log('Creating new account...');

    await this.appService.createAccount();

    this.router.navigate([this.appService.state().loginAction]);
  }

  reload() {
    document.location = document.location;
  }

  async ngOnInit() {
    await this.appService.initialize();

    // If this is first time user visits, we will give them option
    // to create a new account or restore existing.
    // if (this.appService.hasStateBeenSet()) {
    //   await this.appService.initialize();
    //   console.log('App initialized!', this.appService.firstTime());
    //   if (this.appService.firstTime()) {
    //     console.log('First time setup, redirect to introduction!');
    //     this.router.navigate(['/introduction']);
    //   }
    // } else {
    //   console.log('No state has been set, redirect to introduction!');
    // }
  }
}

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./app.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }
