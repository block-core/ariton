import { BreakpointObserver } from '@angular/cdk/layout';
import { ContentChildren, ElementRef, Injectable, QueryList, effect, inject, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

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

  tray = signal<boolean>(false);

  navigation = signal<boolean>(false);

  margin = signal<boolean>(true);

  custom = signal<boolean>(false);

  actions = signal<any[]>([]);

  private breakpointObserver = inject(BreakpointObserver);

  router = inject(Router);

  small = signal<boolean>(false);

  constructor() {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Navigation started

        // console.log('previousUrl', this.previousUrl);
        // console.log('event.url', event.url);

        // if (event.url.startsWith(this.previousUrl)) {
        //   console.log('Keep actions as we are still under same app');
        // } else {
        this.enableScrolling();
        // this.layout.resetActions();
        // }
      } else if (event instanceof NavigationEnd) {
        // Navigation ended
        //this.layout.enableScrolling();
        if (this.countChar('/', event.url) > 1) {
          this.enableNavigation();
        } else {
          this.disableNavigation();
        }

        // this.marginOn();
        // this.getChildren();

        // this.previousUrl = event.url;
        // console.log('This is the previous url', this.previousUrl);
      }
    });

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

  countChar(char: string, string: string): number {
    return string.split(char).length - 1;
  }

  // @ContentChildren(ElementRef, { descendants: true }) children!: QueryList<ElementRef>;

  // isMarginless: boolean = false;

  // getChildren() {
  //   console.log('CHILDREN:', this.children);

  //   this.isMarginless = this.children.toArray().some((child) => {
  //     // Perform operations on the native element
  //     const nativeElement = child.nativeElement;

  //     console.log(nativeElement);
  //     console.log(nativeElement.attribute('data-fullsize'));

  //     // Example: Check for a specific attribute or class
  //     return nativeElement.hasAttribute('data-fullsize');
  //   });
  // }

  ngAfterContentInit() {
    // this.isMarginless = this.children.toArray().some((child) => child.fullsize);
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

  customOff() {
    this.custom.set(false);
  }

  customOn() {
    this.custom.set(true);
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
