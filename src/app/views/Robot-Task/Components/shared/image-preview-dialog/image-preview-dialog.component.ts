import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image-preview-dialog',
  template: `
    <div class="image-dialog-content">
      <img [src]="data.imageUrl" alt="Aperçu" />
    </div>
  `,
  styles: [`
    .image-dialog-content {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #222;
      padding: 0;
    }
    img {
      max-width: 90vw;
      max-height: 90vh;
      border-radius: 16px;
      box-shadow: 0 4px 32px #0009;
      border: 4px solid #fff;
    }
  `]
})
export class ImagePreviewDialogComponent {
  constructor(
      public dialogRef: MatDialogRef<ImagePreviewDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { imageUrl: string }
  ) { }
}
