import { Component, OnInit } from '@angular/core';
import { SousAssemblage } from '../../../Models/sous-assemblage.model';
import { MatDialog } from '@angular/material/dialog';
import { SousAssemblageDialogComponent } from '../sous-assemblage-dialog/sous-assemblage-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RobotTaskService } from "../../../Services/robot-task.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sous-assemblage-list',
  templateUrl: './sous-assemblage-list.component.html',
  styleUrls: ['./sous-assemblage-list.component.scss']
})
export class SousAssemblageListComponent implements OnInit {
  assemblageId!: number;
  assemblageName = '';
  sousAssemblages: SousAssemblage[] = [];
  loading = false;

  constructor(
      private saService: RobotTaskService,
      private snackBar: MatSnackBar,
      private dialog: MatDialog,
      private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.assemblageId = +this.route.snapshot.paramMap.get('assemblageId')!;
    this.assemblageName = history.state.assemblageName || '';
    this.loadSousAssemblages();
  }

  loadSousAssemblages() {
    if (!this.assemblageId) return;
    this.loading = true;
    this.saService.getByAssemblage(this.assemblageId).subscribe({
      next: list => { this.sousAssemblages = list; this.loading = false; },
      error: _ => { this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 2200 }); this.loading = false; }
    });
  }

  openAdd() {
    const matxUser = JSON.parse(localStorage.getItem('MATX_USER') || '{}');
    const appUser = JSON.parse(localStorage.getItem('user') || '{}');
    const createurId = matxUser?.id;              // <-- PRENDRE L'ID ICI
    const email = appUser?.email;                 // <-- PRENDRE L'EMAIL ICI

    const dialogRef = this.dialog.open(SousAssemblageDialogComponent, {
      width: '420px',
      data: {
        sousAssemblage: {
          nom: '',
          description: '',
          assemblageId: this.assemblageId,
          createurId,     // <-- important
          statut: 'NON_DEMARRE'
        },
        isEdit: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.createurId = createurId;
        result.assemblageId = this.assemblageId;
        this.saService.create(result, email).subscribe({
          next: _ => { this.snackBar.open('Sous-assemblage ajouté', 'Fermer', { duration: 2000 }); this.loadSousAssemblages(); },
          error: err => {
            console.error('Erreur lors de l\'ajout', err);
            this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 2000 })
          }
        });
      }
    });

}

  openEdit(sa: SousAssemblage) {
    const dialogRef = this.dialog.open(SousAssemblageDialogComponent, {
      width: '420px',
      data: { sousAssemblage: { ...sa }, isEdit: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saService.update(sa.id!, result, 'user@email.com').subscribe({
          next: _ => { this.snackBar.open('Modifié !', 'Fermer', { duration: 2000 }); this.loadSousAssemblages(); },
          error: _ => this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 2000 })
        });
      }
    });
  }

  remove(sa: SousAssemblage) {
    if (!sa.id) return;
    if (confirm(`Supprimer "${sa.nom}" ?`)) {
      this.saService.delete(sa.id, 'user@email.com').subscribe({
        next: _ => { this.snackBar.open('Supprimé', 'Fermer', { duration: 2000 }); this.loadSousAssemblages(); },
        error: _ => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 2000 })
      });
    }
  }

  goBack() {
    window.history.back();
  }
}
