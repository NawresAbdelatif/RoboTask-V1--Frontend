import { Component, OnInit } from '@angular/core';
import { ProjectResponse } from '../../../Models/project-response.model';
import { RobotTaskService } from '../../../Services/robot-task.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from "../project-create/project-create.component";
import { ProjectRequest } from "../../../Models/project-request.model";
import { getColorForUser } from "../../color.util";
import { MatSnackBar } from '@angular/material/snack-bar';

import { ProjectEditDialogComponent } from "../project-edit-dialog/project-edit-dialog.component";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { PageEvent } from '@angular/material/paginator';
import {Router} from "@angular/router";
import { RefreshProjectListService } from '../../../Services/refresh-project-list.service';
import { Subscription } from 'rxjs';
import {LinkedinShareDialogComponent} from "./linkedin-share-dialog.component";
@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  projects: ProjectResponse[] = [];
  loading = true;
  errorMsg = '';
  page = 0;
  size = 5;
  totalElements = 0;
  successMsg = '';
  searchTerm: string = '';
  statusFilter: string = '';
  private refreshSub?: Subscription;
  selectedProject: ProjectResponse | null = null;

  constructor(private dialog: MatDialog,
              private projectService: RobotTaskService,
              private router: Router,
              private refreshService: RefreshProjectListService,
              private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.refreshSub = this.refreshService.refreshNeeded$.subscribe(() => {
      this.loadProjects();
    });
  }

  ngOnDestroy(): void {
    this.refreshSub?.unsubscribe();
  }

  // loadProjects() {
  //   this.loading = true;
  //   this.projectService.getAllProjects(this.page, this.size).subscribe({
  //     next: (data) => {
  //       this.projects = data.content;
  //       this.totalElements = data.totalElements;
  //       this.loading = false;
  //       if (this.projects.length === 0 && this.page > 0) {
  //         this.page--;
  //         this.loadProjects();
  //       }
  //     },
  //     error: () => {
  //       this.errorMsg = "Erreur lors du chargement des projets";
  //       this.loading = false;
  //     }
  //   });
  // }
  //
  loadProjects() {
    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.projectService.searchProjects(
        this.searchTerm,
        this.statusFilter,
        this.page,
        this.size
    ).subscribe({
      next: (data) => {
        this.projects = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;

        // Ajuster la pagination si page vide
        if (this.projects.length === 0 && this.page > 0) {
          this.page--;
          this.loadProjects();
        }
      },
      error: (err) => {
        // Affiche uniquement les vraies erreurs serveur
        this.errorMsg = err.error?.message || "Erreur lors du chargement des projets";
        this.loading = false;
      }
    });
  }


  onSearchChange() {
    this.page = 0;
    this.loadProjects();
  }

  onStatusChange() {
    this.page = 0;
    this.loadProjects();
  }

  clearSearch() {
    this.searchTerm = '';
    this.page = 0;
    this.loadProjects();
  }

  clearStatus() {
    this.statusFilter = '';
    this.page = 0;
    this.loadProjects();
  }


  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadProjects();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ProjectCreateComponent, {
      width: '450px',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: ProjectRequest | undefined) => {
      if (result) {
        this.projectService.createProject(result).subscribe({
          next: () => {
            this.snackBar.open('✅ Projet créé avec succès!', 'Fermer', {
              duration: 3500,
              panelClass: ['snackbar-success']
            });
            this.loadProjects();
          },
          error: err => {
            this.snackBar.open('❌ Erreur lors de la création du projet', 'Fermer', {
              duration: 4000,
              panelClass: ['snackbar-error']
            });
          }
        });
      }
    });
  }


  editProject(project: ProjectResponse) {
    const dialogRef = this.dialog.open(ProjectEditDialogComponent, {
      width: '450px',
      data: project
    });

    dialogRef.afterClosed().subscribe((updatedProject: ProjectResponse | undefined) => {
      if (updatedProject) {
        this.snackBar.open('✏️ Projet modifié avec succès!', 'Fermer', {
          duration: 3500,
          panelClass: ['snackbar-success']
        });
        this.loadProjects();
      }
    });
  }


  deleteProject(project: ProjectResponse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: `Voulez-vous vraiment supprimer le projet "${project.name}" ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(project.id).subscribe({
          next: () => {
            this.snackBar.open('🗑️ Projet supprimé avec succès!', 'Fermer', {
              duration: 3500,
              panelClass: ['snackbar-success']
            });
            this.loadProjects();
          },
          error: err => {
            this.snackBar.open('❌ Erreur lors de la suppression du projet', 'Fermer', {
              duration: 4000,
              panelClass: ['snackbar-error']
            });
          }
        });
      }
    });
  }

  getProjectIcon(projectName: string): string {
    const icons = ['arrow_right_alt', 'date_range', 'arrow_right_alt', 'event'];
    const idx = this.projects.findIndex(p => p.name === projectName) % icons.length;
    return icons[idx];
  }
  getProjectColor(projectName: string): string {
    const colors = ['warn', 'primary', 'warn', 'accent'];
    const idx = this.projects.findIndex(p => p.name === projectName) % colors.length;
    return colors[idx];
  }
  getProjectStatus(status: string) {
    switch (status) {
      case 'PLANNED':
        return { color: '#1976d2', label: 'Planifié' };
      case 'IN_PROGRESS':
        return { color: '#EE7A46', label: 'En cours' };
      case 'COMPLETED':
        return { color: '#43a047', label: 'Terminé' };
      default:
        return { color: 'default', label: status };
    }
  }
  viewDetails(project: ProjectResponse) {
    this.router.navigate(['/projets', project.id]);
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles?.some((r: string) => r.toUpperCase() === 'ROLE_ADMIN');
  }

  canEditOrDeleteProject(project: ProjectResponse): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.username === project.creatorUsername || this.isAdmin();
  }

  getColorForUser(username: string): string {
    return getColorForUser(username);
  }

  archiveProject(project: ProjectResponse) {
    this.projectService.archiveProject(project.id).subscribe({
      next: () => {
        this.snackBar.open('📦 Projet archivé avec succès!', 'Fermer', {
          duration: 3500,
          panelClass: ['snackbar-success']
        });
        this.loadProjects();
      },
      error: err => {
        this.snackBar.open('❌ Erreur lors de l\'archivage du projet', 'Fermer', {
          duration: 4000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  openLinkedInShareDialog(project: ProjectResponse) {
    const postContent =
        `🚀 Chez ACWA Robotics, nous poursuivons notre engagement pour l'innovation et la créativité !\n\n` +
        `Nous sommes ravis d’annoncer le lancement d’un **nouveau projet ambitieux** : Le robot **${project.name}**.\n\n` +
        `💡 ${project.description || 'explorer de nouvelles frontières en robotique et automatisation.'}\n\n` +
        `📅 Ce projet sera lancé : le ${new Date(project.startDate).toLocaleDateString('fr-FR')}.toLocaleDateString('fr-FR')}.\n\n` +
        `👏 Félicitations à toutes les équipes impliquées !\n\n` +
        `#Innovation #Robotique #Créativité #Projet #${project.name.replace(/\s+/g, '')} via ROBOTASK`;

    const dialogRef = this.dialog.open(LinkedinShareDialogComponent, {
      width: '500px',
      data: { content: postContent }
    });

    dialogRef.afterClosed().subscribe(userContent => {
      if (userContent !== null && userContent.trim() !== '') {
        const url = encodeURIComponent(window.location.origin + '/projets/' + project.id);
        const summary = encodeURIComponent(userContent);
        window.open(
            `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(project.name)}&summary=${summary}`,
            '_blank'
        );
      }
    });
  }
}
