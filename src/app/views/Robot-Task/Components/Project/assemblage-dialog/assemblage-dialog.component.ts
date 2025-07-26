import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Assemblage } from '../../../Models/assemblage.model';

@Component({
  selector: 'app-assemblage-dialog',
  templateUrl: './assemblage-dialog.component.html',
  styleUrls: ['./assemblage-dialog.component.scss']
})
export class AssemblageDialogComponent {
  assemblage: Assemblage;

  constructor(
      public dialogRef: MatDialogRef<AssemblageDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { assemblage: Assemblage, isEdit: boolean }
  ) {
    this.assemblage = { ...data.assemblage };
  }

  onCancel() {
    this.dialogRef.close();
  }
  onSave() {
    this.dialogRef.close(this.assemblage);
  }
}
