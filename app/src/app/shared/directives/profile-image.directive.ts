import { Directive, ElementRef, inject, Input, input } from '@angular/core';
import { IdentityService } from '../../identity.service';
import { ProfileService } from '../../profile.service';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appProfileImage]',
  standalone: true,
})
export class ProfileImageDirective {
  @Input() public did2: boolean = false;

  //   did = input.required<string>();

  appProfileImage = input.required<string>();

  identity = inject(IdentityService);

  profile = inject(ProfileService);

  sanitizer = inject(DomSanitizer);

  constructor(private el: ElementRef) {}

  async ngAfterViewInit() {
    if (this.appProfileImage()) {
      const profile = await this.profile.loadProfile(this.appProfileImage());
      //   const url = this.sanitizer.bypassSecurityTrustResourceUrl(profile.avatar);
      const url = profile.avatar;

      console.log(profile);

      this.el.nativeElement.src = url;
      this.el.nativeElement.onerror = "this.src='/avatar-placeholder.png';this.onerror='';";
    }
  }
}
