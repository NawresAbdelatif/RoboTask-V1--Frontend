import { Component, OnInit } from '@angular/core';
import { RobotTaskService } from '../../../Services/robot-task.service';
import { ProjectResponse } from '../../../Models/project-response.model';
import { PageEvent } from '@angular/material/paginator';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {getColorForUser} from "../../color.util";

@Component({
  selector: 'app-project-archived-list',
  templateUrl: './project-archived-list.component.html',
  styleUrls: ['./project-archived-list.component.scss']
})
export class ProjectArchivedListComponent implements OnInit {
  projects: ProjectResponse[] = [];
  page = 0;
  size = 5;
  totalElements = 0;
  loading = true;
  successMsg = '';
  searchTerm: string = '';
  statusFilter: string = '';
  errorMsg = '';

  constructor(private projectService: RobotTaskService,private dialog: MatDialog,private router: Router,) {}

  ngOnInit() {
    this.loadArchivedProjects();
  }

  loadArchivedProjects() {
    this.loading = true;
    this.projectService.getArchivedProjects(this.page, this.size).subscribe({
      next: data => {
        this.projects = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }


  unarchiveProject(project: ProjectResponse) {
    this.projectService.unarchiveProject(project.id).subscribe({
      next: () => {
        // Affiche succès, recharge la liste des archivés, etc.
        this.loadArchivedProjects();
        // Si tu veux aussi rafraîchir la liste active, appelle-le via un service d’event
      },
      error: err => {
        // Gestion d’erreur
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.size = event.pageSize;
    this.loadArchivedProjects();
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

  getColorForUser(username: string): string {
    return getColorForUser(username);
  }



  deleteProject(project: ProjectResponse) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: `Voulez-vous vraiment supprimer le projet "${project.name}" ?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.deleteProject(project.id).subscribe({
          next: (res) => {
            console.log("SUCCESS delete", res);
            this.successMsg = "Projet supprimé avec succès !";
            this.loadProjects();
            setTimeout(() => this.successMsg = '', 3000);
          },
          error: err => {
            console.error("DELETE ERROR", err);
            this.errorMsg = err.error?.message || "Erreur lors de la suppression";
            setTimeout(() => this.errorMsg = '', 4000);
          }
        });

      }
    });
  }
  loadProjects() {
    this.loading = true;
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
        if (this.projects.length === 0 && this.page > 0) {
          this.page--;
          this.loadProjects();
        }
      },
      error: () => {
        this.errorMsg = "Erreur lors du chargement des projets";
        this.loading = false;
      }
    });
  }
  viewDetails(project: ProjectResponse) {
    this.router.navigate(['/projets', project.id]);
  }


}
