import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Piece } from '../../../Models/piece.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RobotTaskService} from "../../../Services/robot-task.service";

@Component({
  selector: 'app-piece-dialog',
  templateUrl: './piece-dialog.component.html',
  styleUrls: ['./piece-dialog.component.scss']
})
export class PieceDialogComponent {
  pieceForm: FormGroup;
  isEditMode: boolean;
  previewUrl: string = '';
  selectedFile: File | null = null;
  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<PieceDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { piece?: Piece },
      private pieceService: RobotTaskService

  ) {
    this.isEditMode = !!data.piece;
    this.pieceForm = this.fb.group({
      reference: [data.piece?.reference || '', Validators.required],
      designation: [data.piece?.designation || '', Validators.required],
      quantite: [data.piece?.quantite || 1, [Validators.required, Validators.min(1)]],
      imageUrl: [data.piece?.imageUrl || ''],
      observation: [data.piece?.observation || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.pieceForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.pieceService.uploadImage(formData).subscribe({
          next: (imageUrl: string) => {
            this.pieceForm.patchValue({ imageUrl });
            this.dialogRef.close(this.pieceForm.value);
          },
          error: () => { /* Gérer l'erreur */ }
        });
      } else {
        this.dialogRef.close(this.pieceForm.value);
      }
    }
  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Pour l’aperçu
      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }
}
