import { inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  snackBar = inject(MatSnackBar);

  constructor() {}

  // executeAsyncWithoutWaiting(action: () => Promise<any>) {
  //   action();
  // }

  async executeAsyncWithToast(action: Promise<any>, successMessage?: string, errorMessage?: string) {
    try {
      await action;

      if (successMessage) {
        this.openSnackBar(successMessage);
      }
    } catch (error) {
      if (errorMessage) {
        this.openSnackBar(errorMessage);
      } else {
        this.openSnackBar(`Error: ${error}.`);
      }
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 2000 });
  }
}
