import { Component, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';
import { IdentityService } from './identity.service';
import { UnlockComponent } from './account/unlock/unlock.component';
import { AppService } from './app.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule, RouterOutlet, LayoutComponent, UnlockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';
  appService = inject(AppService);

  constructor(private router: Router, private layout: LayoutService, public identityService: IdentityService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.layout.enableScrolling();
        // Navigation started
      } else if (event instanceof NavigationEnd) {
        // Navigation ended
        //this.layout.enableScrolling();
      }
    });

    effect(() => {
      if (this.appService.initialized()) {
        console.log('App has been initialized!!!!');
      }
    });
  }

  forceClose() {
    // Force the initialized to be set to true. This can be useful when
    // the app load or creation has issues during the prototype/beta phases.
    this.appService.initialized.set(true);
  }

  async ngOnInit() {
    await this.appService.initialize();

    console.log('App initialized!', this.appService.firstTime());

    if (this.appService.firstTime()) {
      console.log('First time setup, redirect to introduction!');
      this.router.navigate(['/introduction']);
    }
  }
}
