import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Piece} from "../../../Models/piece.model";
import {RobotTaskService} from "../../../Services/robot-task.service";
import {Outil} from "../../../Models/outil.model";

@Component({
  selector: 'app-outil-dialog',
  templateUrl: './outil-dialog.component.html',
  styleUrls: ['./outil-dialog.component.scss']
})
export class OutilDialogComponent {

  outilForm: FormGroup;
  isEditMode: boolean;
  previewUrl: string = '';
  selectedFile: File | null = null;
  constructor(
      private fb: FormBuilder,
      public dialogRef: MatDialogRef<OutilDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { outil?: Outil },
      private outilService: RobotTaskService

  ) {
    this.isEditMode = !!data.outil;
    this.outilForm = this.fb.group({
      reference: [data.outil?.reference || '', Validators.required],
      designation: [data.outil?.designation || '', Validators.required],
      specification: [data.outil?.specification || '', Validators.required],
      // quantite: [data.outil?.quantite || 1, [Validators.required, Validators.min(1)]],
      imageUrl: [data.outil?.imageUrl || ''],
      description: [data.outil?.description || '']
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.outilForm.valid) {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        this.outilService.uploadImage(formData).subscribe({
          next: (imageUrl: string) => {
            this.outilForm.patchValue({ imageUrl });
            this.dialogRef.close(this.outilForm.value);
          },
          error: () => {  }
        });
      } else {
        this.dialogRef.close(this.outilForm.value);
      }
    }
  }



  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = e => this.previewUrl = reader.result as string;
      reader.readAsDataURL(file);
    }
  }

}
