import { Component, inject, input, signal } from '@angular/core';
import { IdentityService } from '../../../identity.service';
import { MatCardModule } from '@angular/material/card';
import { ProfileService } from '../../../profile.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { DidPipe } from '../../pipes/did.pipe';
import { DidComponent } from '../did/did.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [RouterModule, DidComponent, MatTooltipModule, MatCardModule, SafeUrlPipe, DidPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  // @Input() name: string;
  // @Input() author: string;
  // @Input() thumbnail: string;
  // @Input() message: string;

  identity = inject(IdentityService);

  profile = inject(ProfileService);

  sanitizer = inject(DomSanitizer);

  did = input.required<string>();

  data = signal<any>({});

  async ngAfterViewInit() {
    if (this.did()) {
      const profile = await this.profile.loadProfile(this.did());
      // const url = this.sanitizer.bypassSecurityTrustResourceUrl(profile.avatar);
      // const url = profile.avatar;
      console.log(profile);

      this.data.set(profile);

      // this.data.set({
      //   thumbnail: url,
      // });

      // this.el.nativeElement.src = url;
      // this.el.nativeElement.onerror = "this.src='/avatar-placeholder.png';this.onerror='';";
    }
  }
}
