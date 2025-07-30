import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sous-assemblage-dialog',
  templateUrl: './sous-assemblage-dialog.component.html'
})
export class SousAssemblageDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
