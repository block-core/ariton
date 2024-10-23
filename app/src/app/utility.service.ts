import { inject, Injectable } from '@angular/core';
import { AppService } from './app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PortableIdentity } from '@web5/agent';

export type BackupOptions = {
  portableIdentity?: PortableIdentity;
};

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

  async backupAccount({ portableIdentity }: BackupOptions = {}) {
    if (portableIdentity) {
      const blob = new Blob([JSON.stringify(portableIdentity)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'portableIdentity.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }
}
