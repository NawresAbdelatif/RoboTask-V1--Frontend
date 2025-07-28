import { Component, Input, OnInit } from '@angular/core';
import { RobotTaskService } from '../../../Services/robot-task.service';
import { Assemblage } from '../../../Models/assemblage.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AssemblageDialogComponent } from '../assemblage-dialog/assemblage-dialog.component'; // adapte le chemin !
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assemblage-list',
  templateUrl: './assemblage-list.component.html',
  styleUrls: ['./assemblage-list.component.scss']
})
export class AssemblageListComponent implements OnInit {
  @Input() projectId!: number;
  assemblages: Assemblage[] = [];
  search = '';
  page = 0;
  size = 5;
  total = 0;
  loading = false;

 showForm = false;
  isEdit = false;
  current: Assemblage = { nom: '', description: '' };
  cols = ['drag', 'nom', 'description', 'dateCreation', 'creator', 'actions'];

  constructor(private robotService: RobotTaskService, private snackBar: MatSnackBar,
              private dialog: MatDialog,  private router: Router
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    if (!this.projectId) return;
    this.loading = true;
    this.robotService.getAssemblages(this.projectId, this.page, this.size, this.search)
        .subscribe({
          next: res => {
            this.assemblages = res.content;
            this.total = res.totalElements;
            this.loading = false;
          },
          error: _ => {
            this.snackBar.open('Erreur de chargement', 'Fermer', { duration: 2500 });
            this.loading = false;
          }
        });
  }

  openAdd() {
    const dialogRef = this.dialog.open(AssemblageDialogComponent, {
      width: '400px',
      data: { assemblage: { nom: '', description: '' }, isEdit: false }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.robotService.createAssemblage(this.projectId, result).subscribe({
          next: _ => {
            this.snackBar.open('Assemblage ajouté', 'Fermer', { duration: 2000 });
            this.load();
          },
          error: _ => this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 2000 })
        });
      }
    });
  }

  openEdit(ass: Assemblage) {
    const dialogRef = this.dialog.open(AssemblageDialogComponent, {
      width: '400px',
      data: { assemblage: ass, isEdit: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.robotService.updateAssemblage(this.projectId, ass.id!, result).subscribe({
          next: _ => {
            this.snackBar.open('Assemblage modifié', 'Fermer', { duration: 2000 });
            this.load();
          },
          error: _ => this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 2000 })
        });
      }
    });
  }

  save() {
    if (this.isEdit && this.current.id) {
      this.robotService.updateAssemblage(this.projectId, this.current.id, this.current).subscribe({
        next: _ => {
          this.snackBar.open('Assemblage modifié', 'Fermer', { duration: 2000 });
          this.showForm = false;
          this.load();
        },
        error: _ => this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 2000 })
      });
    } else {
      this.robotService.createAssemblage(this.projectId, this.current).subscribe({
        next: _ => {
          this.snackBar.open('Assemblage ajouté', 'Fermer', { duration: 2000 });
          this.showForm = false;
          this.load();
        },
        error: _ => this.snackBar.open('Erreur lors de l\'ajout', 'Fermer', { duration: 2000 })
      });
    }
  }
  remove(ass: Assemblage) {
    if (!ass.id) return;
    if (confirm(`Supprimer l'assemblage "${ass.nom}" ?`)) {
      this.robotService.deleteAssemblage(this.projectId, ass.id).subscribe({
        next: _ => {
          this.snackBar.open('Assemblage supprimé', 'Fermer', { duration: 2000 });
          this.load();
        },
        error: _ => this.snackBar.open('Erreur lors de la suppression', 'Fermer', { duration: 2000 })
      });
    }
  }
  cancel() {
    this.showForm = false;
    this.current = { nom: '', description: '' };
  }
  onPage(event: any) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.load();
  }
  onSearchChange() {
    this.page = 0;
    this.load();
  }

    drop(event: CdkDragDrop<Assemblage[]>) {
        moveItemInArray(this.assemblages, event.previousIndex, event.currentIndex);
        const orderedIds = this.assemblages.map(a => a.id);
        this.robotService.reorderAssemblages(this.projectId, orderedIds).subscribe({
            next: () => {
                this.snackBar.open('Ordre sauvegardé', 'Fermer', { duration: 1500 });
                this.load(); // <<<< recharge la liste depuis le backend pour afficher l’ordre exact sauvegardé
            },
            error: () => this.snackBar.open('Erreur de sauvegarde ordre', 'Fermer', { duration: 2500 })
        });
    }

    goToSousAssemblages(assemblage: Assemblage) {
        this.router.navigate(
            ['/assemblages', assemblage.id, 'sous-assemblages'],
            { state: { assemblageName: assemblage.nom } }
        );
    }



}
