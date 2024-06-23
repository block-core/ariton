import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RouterLink, MatDividerModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private _snackBar: MatSnackBar) {

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, undefined, { duration: 2000 });
  }

  async shareProfile() {
    const title = 'SondreB (Voluntaryist)';
    const url = document.location.href;
    const text = "Check out this profile on Ariton";

    try {
      await navigator
        .share({
          title,
          url,
          text
        });

      this.openSnackBar('Thanks for sharing!');
    } catch (err) {
      this.openSnackBar(`Couldn't share ${err}`);
    }
  }
}
