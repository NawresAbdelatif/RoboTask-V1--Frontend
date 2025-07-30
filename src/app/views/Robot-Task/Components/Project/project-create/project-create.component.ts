import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {ProjectRequest} from "../../../Models/project-request.model";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  project: ProjectRequest = {
    reference: '',
    name: '',
    description: '',
    status: 'PLANNED',
    startDate: '',
    // endDate: ''
  };

  constructor(public dialogRef: MatDialogRef<ProjectCreateComponent>) {}

  save() {
    if (this.project.name) {
      this.dialogRef.close(this.project);
    }
  }
  cancel() {
    this.dialogRef.close();
  }
}
