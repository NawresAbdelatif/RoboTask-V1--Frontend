import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-linkedin-share-dialog',
    template: `
        <h2 mat-dialog-title>Partager sur LinkedIn</h2>
        <mat-dialog-content>
            <textarea matInput rows="8" style="width:100%;" [(ngModel)]="data.content"></textarea>
            <div style="margin:10px 0;">
                <button mat-stroked-button (click)="copyToClipboard()" style="margin-right:10px;">
                    Copier le texte
                </button>
                <span *ngIf="copied" style="color: #1976d2;">✅ Copié !</span>
            </div>
            <small style="color:#888;">
                LinkedIn ne permet pas de remplir automatiquement le texte du post.<br>
                <b>Copiez le texte</b> puis collez-le manuellement sur LinkedIn.<br>
                (C’est une limitation imposée par LinkedIn)
            </small>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
            <button mat-button (click)="onCancel()">Annuler</button>
            <button mat-flat-button color="primary" (click)="onShare()">Ouvrir LinkedIn</button>
        </mat-dialog-actions>
    `
})
export class LinkedinShareDialogComponent {
    copied = false;
    constructor(
        public dialogRef: MatDialogRef<LinkedinShareDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { content: string }
    ) {}

    copyToClipboard() {
        navigator.clipboard.writeText(this.data.content || '').then(() => {
            this.copied = true;
            setTimeout(() => this.copied = false, 1800);
        });
    }
    onCancel() {
        this.dialogRef.close();
    }
    onShare() {
        this.dialogRef.close(this.data.content);
    }
}
