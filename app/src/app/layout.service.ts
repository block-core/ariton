import { Injectable, effect, signal } from '@angular/core';

export interface LayoutAction {
  name: string;
  icon: string;
  action: any;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor() {
    effect(() => {
      const element = document.querySelector('.sidenav-scroll-wrapper') as any;
      if (element) {
        if (this.scrolling()) {
          element.style.overflow = 'auto';
        } else {
          element.style.overflow = 'hidden';
        }
      }

      const element2 = document.querySelector('.sidenav-content') as any;
      if (element2) {
        if (this.scrolling()) {
          element2.style.overflow = 'auto';
        } else {
          element2.style.overflow = 'hidden';
        }
      }
    });
  }

  scrolling = signal<boolean>(true);

  navigation = signal<boolean>(false);

  actions = signal<any[]>([]);

  addAction(action: LayoutAction) {
    this.actions.update((actions) => [...actions, action]);
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
