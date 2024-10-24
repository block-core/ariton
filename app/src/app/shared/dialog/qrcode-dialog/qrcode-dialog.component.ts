import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatButtonToggleModule, FormsModule],
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss',
})
export class QRCodeDialogComponent {
  qrStyle = 'did';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { did: string }) {}

  ngAfterViewInit() {
    this.generateQR(this.data.did);
  }

  generateQR(data: string) {
    const canvas = document.querySelector('canvas');
    QRCode.toCanvas(canvas, data, { width: 256 }, (error: any) => {
      if (error) {
        console.error('Error generating QR code: ', error);
      }
    });
  }

  onToggleGroupChange(event: MatButtonToggleChange) {
    // Handle the change event
    console.log('Selected value:', event.value);
    console.log(this.qrStyle);
    // Add your logic here

    if (this.qrStyle == 'profile') {
      this.generateQR(`https://profile.ariton.app/?did=${this.data.did}`);
    } else {
      this.generateQR(this.data.did);
    }
  }
}
