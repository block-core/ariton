import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import Cropper from 'cropperjs';

@Component({
    selector: 'app-image-cropper',
    imports: [MatIconModule, MatButtonModule, MatDialogModule],
    templateUrl: './image-cropper.component.html',
    styleUrl: './image-cropper.component.scss'
})
export class ImageCropperComponent {
  sanitizedUrl!: SafeUrl;
  cropper!: Cropper;

  constructor(
    public dialogRef: MatDialogRef<ImageCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public image: string,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

  ngAfterViewInit() {
    this.initCropper();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  initCropper() {
    const image = document.getElementById('image') as HTMLImageElement;
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      guides: false,
    });
  }

  getRoundedCanvas(sourceCanvas: any, targetWidth: number, targetHeight: number) {
    var canvas = document.createElement('canvas');
    var context: any = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;

    canvas.width = targetWidth;
    canvas.height = targetHeight;
    context.imageSmoothingEnabled = true;

    // context.minWidth = 64;
    // context.minHeight = 64;
    // context.maxWidth = 512;
    // context.maxHeight = 512;

    // context.drawImage(sourceCanvas, 0, 0, width, height);
    context.drawImage(sourceCanvas, 0, 0, width, height, 0, 0, targetWidth, targetHeight);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    // context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.arc(targetWidth / 2, targetHeight / 2, Math.min(targetWidth, targetHeight) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  }

  crop() {
    // Let's do 256x256 as max size for optimal loading performance.
    // const croppedCanvas = this.cropper.getCroppedCanvas({ maxHeight: 256, maxWidth: 256 });
    const croppedCanvas = this.cropper.getCroppedCanvas();
    const roundedCanvas = this.getRoundedCanvas(croppedCanvas, 512, 512);

    const imageUrl = roundedCanvas.toDataURL('image/jpeg');

    // TODO: We should put a limit on profile image size, and the UI should warn before even
    // attempting to upload.
    // console.log(imageUrl.length);

    // cropper.getCroppedCanvas({ width: DESIRED_WIDTH, height: DESIRED_HEIGHT }).toDataURL(ORIGINAL_MIME_TYPE);

    // let roundedImage = document.createElement('img');

    // if (roundedImage) {
    this.dialogRef.close(imageUrl);
    // } else {
    //   return this.dialogRef.close(null);
    // }
  }

  reset() {
    this.cropper.clear();
    this.cropper.crop();
  }
}
