import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FileMimeType } from './file-mime-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit, AfterViewInit {
  fileMimeType = FileMimeType;
  @Input() type?: FileMimeType | string;
  @Input() src: any;
  @Input() zoom = 1;

  currentPage = 1;
  totalPages = 1;

  ngAfterViewInit() {
    const iframe = document.getElementById('frame') as HTMLIFrameElement;
    if (iframe && iframe.contentDocument) {
      const style = document.createElement('style');
      style.textContent = `
        body {
          background-color: #f0f0f0;
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `;
      iframe.contentDocument.head.appendChild(style);
    }
  }

  ngOnInit() {
    // Initialize totalPages if needed
    this.totalPages = this.getPdfTotalPages();
  }

  // zoomIn(): void {
  //   if (this.type === this.fileMimeType.PDF) {
  //     this.pdfZoom += 0.1;
  //   } else if (this.type === this.fileMimeType.JPEG || this.type === this.fileMimeType.PNG) {
  //     this.imageZoom += 0.1;
  //   }
  // }

  // zoomOut(): void {
  //   if (this.type === this.fileMimeType.PDF) {
  //     this.pdfZoom = Math.max(0.1, this.pdfZoom - 0.1);
  //   } else if (this.type === this.fileMimeType.JPEG || this.type === this.fileMimeType.PNG) {
  //     this.imageZoom = Math.max(0.1, this.imageZoom - 0.1);
  //   }
  // }

  goToPage(): void {
    if (this.currentPage < 1) {
      this.currentPage = 1;
    } else if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  constructor() {
    this.totalPages = this.getPdfTotalPages();
  }

  getPdfTotalPages(): number {
    // Implement logic to get the total number of pages from the PDF data
    return 10; // Replace with the actual total pages count
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}
