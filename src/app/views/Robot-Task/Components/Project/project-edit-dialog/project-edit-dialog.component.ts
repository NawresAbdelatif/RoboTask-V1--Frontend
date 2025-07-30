import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {RobotTaskService} from "../../../Services/robot-task.service";
import {ProjectRequest, ProjectStatus} from "../../../Models/project-request.model";
import {ProjectResponse} from "../../../Models/project-response.model";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-project-edit-dialog',
  templateUrl: './project-edit-dialog.component.html',
})
export class ProjectEditDialogComponent {
  project: ProjectRequest;
  statusList: ProjectStatus[] = ['PLANNED', 'IN_PROGRESS', 'COMPLETED'];

  constructor(
      private dialogRef: MatDialogRef<ProjectEditDialogComponent>,
      private projectService: RobotTaskService,
      private dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: ProjectResponse
  ) {
    this.project = {
      reference: data.reference,
      name: data.name,
      description: data.description,
      status: data.status,
      startDate: data.startDate,
      // endDate: data.endDate,
    };
  }

  cancel() {
    this.dialogRef.close();
  }

  update() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {message: `Voulez-vous vraiment modifier le projet "${this.project.name}" ?`}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.projectService.updateProject(this.data.id, this.project).subscribe({
          next: (updatedProject) => this.dialogRef.close(updatedProject),
          error: (err) => alert("Erreur lors de la modification : " + (err.error?.message || err.message))
        });
      }
    });
  }
}
