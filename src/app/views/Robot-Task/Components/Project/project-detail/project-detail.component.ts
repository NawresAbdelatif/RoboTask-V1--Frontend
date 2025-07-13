import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RobotTaskService } from '../../../Services/robot-task.service';
import { ProjectResponse } from '../../../Models/project-response.model';
import {MatDialog} from "@angular/material/dialog";
import { getColorForUser } from "../../color.util";
import {
  ProjectAddCollaboratorDialogComponent
} from "../project-add-collaborator-dialog/project-add-collaborator-dialog.component";
import {RefreshProjectListService} from "../../../Services/refresh-project-list.service";

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {
  project?: ProjectResponse;
  loading = true;
  errorMsg = '';
  getColorForUser = getColorForUser;
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private projectService: RobotTaskService,
      private dialog: MatDialog,
      private refreshService: RefreshProjectListService

  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.projectService.getProjectById(id).subscribe({
        next: (data) => {
          this.project = data;
          this.loading = false;
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Projet introuvable';
          this.loading = false;
        }
      });
    } else {
      this.errorMsg = "ID du projet manquant.";
      this.loading = false;
    }
  }

  retourListe() {
    this.router.navigate(['/projets/list']);
  }

  getStatusLabel(status: string) {
    switch (status) {
      case 'PLANNED': return 'Planifié';
      case 'IN_PROGRESS': return 'En cours';
      case 'COMPLETED': return 'Terminé';
      default: return status;
    }
  }
  getStatusColor(status: string) {
    switch (status) {
      case 'PLANNED': return '#1976d2';
      case 'IN_PROGRESS': return '#EE7A46';
      case 'COMPLETED': return '#43a047';
      default: return '#bdbdbd';
    }
  }

  canAddCollaborator(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Autoriser si admin ou créateur
    return this.project &&
        (user.username === this.project.creatorUsername ||
            (user.roles && user.roles.includes('ROLE_ADMIN')));
  }


  openAddCollaboratorDialog() {
    const dialogRef = this.dialog.open(ProjectAddCollaboratorDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.addCollaborator(this.project!.id, result).subscribe({
          next: () => {
            this.projectService.getProjectById(this.project!.id).subscribe(p => this.project = p);

            this.refreshService.requestRefresh();
          },

        });
      }
    });
  }

  getInitials(name: string): string {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0][0];
    return (parts[0][0] + parts[parts.length-1][0]).toUpperCase();
  }



}
