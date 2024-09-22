import { Component, effect, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ProfileHeaderComponent } from '../../shared/components/profile-header/profile-header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { AppService } from '../../app.service';
import { AgoPipe } from '../../shared/pipes/ago.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IdentityService } from '../../identity.service';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatDividerModule,
    ProfileHeaderComponent,
    MatProgressSpinnerModule,
    AgoPipe,
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  app = inject(AppService);

  identity = inject(IdentityService);

  layout = inject(LayoutService);

  entry: any;

  constructor(private route: ActivatedRoute) {
    this.layout.marginOff();

    effect(async () => {
      if (this.app.initialized()) {
        this.route.paramMap.subscribe((params) => {
          const postId = params.get('postId');
          const did = params.get('id');

          if (postId && postId !== 'undefined') {
            console.log('USER ID SET!!', did, postId);
            this.loadPost(did!, postId);
          }
        });
      }
    });
  }

  ngOnInit() {}

  private async loadPost(did: string, postId: string) {
    const { record } = await this.identity.web5.dwn.records.read({
      from: did,
      message: {
        filter: {
          recordId: postId,
        },
      },
    });

    if (record) {
      this.entry = {
        record,
        data: await record.data.json(),
        id: record.id,
      };
    } else {
      this.entry = undefined;
    }

    try {
      // const profile = await this.profileService.loadProfile(userId);
      // this.data.set(profile);
    } catch (err) {
      console.error(err);
    }

    //let blob = new Blob([this.profileService.avatar()]);
    // console.log(this.profileService.avatar());

    // var imageUrl = URL.createObjectURL(this.profileService.avatar());

    // const reader = new FileReader();
    // reader.readAsDataURL(this.profileService.avatar());
    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   this.avatarSrc = reader.result;
    //   // result includes identifier 'data:image/png;base64,' plus the base64 data
    // };

    //this.avatarSrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));

    // const reader = new FileReader();
    // reader.readAsDataURL(this.profileService.avatar());
    // reader.onloadend = () => {
    //   console.log(reader.result);
    //   this.avatarSrc = reader.result;
    //   // result includes identifier 'data:image/png;base64,' plus the base64 data
    // };
  }
}
