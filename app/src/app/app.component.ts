import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { LayoutService } from './layout.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router, private layout: LayoutService) {
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
