import { Component, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';
import { IdentityService } from './identity.service';
import { UnlockComponent } from './account/unlock/unlock.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent, UnlockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';

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
  }
}
