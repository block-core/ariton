import { Component, inject, Input } from '@angular/core';
import { FileMimeType } from './file-mime-type';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-file-viewer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './file-viewer.component.html',
  styleUrl: './file-viewer.component.scss',
})
export class FileViewerComponent {
  fileMimeType = FileMimeType;
  @Input() type?: FileMimeType | string;
  @Input() src: any;
  @Input() pdfZoom = 1;

  // pdfData: Blob;
  currentPage = 1;
  totalPages = 1;

  zoomLevel = 100;

  zoomIn(): void {
    this.zoomLevel += 10;
  }

  zoomOut(): void {
    if (this.zoomLevel > 10) {
      this.zoomLevel -= 10;
    }
  }

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
