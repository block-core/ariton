import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode-dialog',
  standalone: true,
  imports: [],
  templateUrl: './qrcode-dialog.component.html',
  styleUrl: './qrcode-dialog.component.scss',
})
export class QRCodeDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { did: string }) {}

  ngAfterViewInit() {
    const canvas = document.querySelector('canvas');
    QRCode.toCanvas(canvas, this.data.did, (error: any) => {
      if (error) {
        console.error('Error generating QR code: ', error);
      }
    });
  }
}
