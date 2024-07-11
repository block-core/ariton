import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfileService } from '../profile.service';
import { MatTabsModule } from '@angular/material/tabs';
import { IdentityService } from '../identity.service';
import { profile } from '../../protocols';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, MatIconModule, MatButtonModule, MatMenuModule, RouterLink, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  profileService = inject(ProfileService);

  identity = inject(IdentityService);

  profile = signal<any>({});

  constructor(private _snackBar: MatSnackBar, private route: ActivatedRoute) {
    effect(() => {
      if (this.identity.initialized()) {
        this.route.paramMap.subscribe((params) => {
          const userId = params.get('id'); // Assuming 'id' is the name of the route parameter
          if (userId) {
            this.loadUserProfile(userId);
          }
        });
      }
    });
  }

  async ngOnInit() {}

  async loadData() {}

  private async loadUserProfile(userId: string) {
    await this.profileService.openProfile(userId);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }

  async shareProfile() {
    const title = 'SondreB (Voluntaryist)';
    const url = document.location.href;
    const text = 'Check out this profile on Ariton';

    try {
      await navigator.share({
        title,
        url,
        text,
      });

      this.openSnackBar('Thanks for sharing!');
    } catch (err) {
      this.openSnackBar(`Couldn't share ${err}`);
    }
  }
}
