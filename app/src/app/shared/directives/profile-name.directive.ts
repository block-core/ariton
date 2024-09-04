import { Directive, ElementRef, inject, Input, input } from '@angular/core';
import { IdentityService } from '../../identity.service';
import { ProfileService } from '../../profile.service';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appProfileName]',
  standalone: true,
})
export class ProfileNameDirective {
  @Input() public did2: boolean = false;

  appProfileName = input.required<string>();

  identity = inject(IdentityService);

  profile = inject(ProfileService);

  sanitizer = inject(DomSanitizer);

  constructor(private el: ElementRef) {}

  async ngAfterViewInit() {
    if (this.appProfileName()) {
      const profile = await this.profile.loadProfile(this.appProfileName());
      let name = this.appProfileName();

      if (profile && profile.profile && profile.profile.name) {
        name = profile.profile.name;
      }

      this.el.nativeElement.innerText = name;
    }
  }
}
