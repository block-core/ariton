import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, effect, inject, signal } from '@angular/core';

export interface LayoutAction {
  name: string;
  icon: string;
  action: any;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  search = signal<boolean>(false);

  searchInput: string = '';

  scrolling = signal<boolean>(true);

  navigation = signal<boolean>(false);

  margin = signal<boolean>(true);

  actions = signal<any[]>([]);

  private breakpointObserver = inject(BreakpointObserver);

  small = signal<boolean>(false);

  constructor() {
    const customBreakpoint = '(max-width: 959.98px)';

    // Observe the custom breakpoint
    this.breakpointObserver.observe([customBreakpoint]).subscribe((result) => {
      console.log('MATCHES:', result.matches);
      if (result.matches) {
        // Code to execute when the viewport is 959.98px or less
        this.small.set(true);
      } else {
        // Code to execute when the viewport is greater than 959.98px
        this.small.set(false);
      }
    });

    effect(() => {
      const element = document.querySelector('.sidenav-scroll-wrapper') as any;
      if (element) {
        if (this.scrolling()) {
          element.style.overflow = 'auto';
        } else {
          element.style.overflow = 'hidden';
        }
      }

      const element2 = document.getElementById('sidenav-content') as any;
      if (element2) {
        if (this.scrolling()) {
          element2.style.overflow = 'auto';
        } else {
          element2.style.overflow = 'hidden';
        }
      }
    });
  }

  toggleSearch() {
    this.search.set(!this.search());
    this.searchInput = '';
  }

  setActions(actions: LayoutAction[]) {
    this.actions.set(actions);
  }

  addAction(action: LayoutAction) {
    this.actions.update((actions) => [...actions, action]);
  }

  marginOff() {
    this.margin.set(false);
  }

  marginOn() {
    this.margin.set(true);
  }

  resetActions() {
    this.actions.set([]);
  }

  enableScrolling() {
    this.scrolling.set(true);
  }

  disableScrolling() {
    this.scrolling.set(false);
  }

  enableNavigation() {
    this.navigation.set(true);
  }

  disableNavigation() {
    this.navigation.set(false);
  }
}
