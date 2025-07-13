import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RobotTaskService } from '../../../Services/robot-task.service';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';

@Component({
  selector: 'app-project-add-collaborator-dialog',
  templateUrl: './project-add-collaborator-dialog.component.html',
})
export class ProjectAddCollaboratorDialogComponent implements OnInit {
  collaboratorControl = new FormControl('');
  operatorUsernames: string[] = [];
  filteredOptions!: Observable<string[]>;

  constructor(
      private robotTaskService: RobotTaskService,
      public dialogRef: MatDialogRef<ProjectAddCollaboratorDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.robotTaskService.getOperatorUsernames().subscribe({
      next: users => {
        this.operatorUsernames = users;
        this.filteredOptions = this.collaboratorControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || ''))
        );
      }
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.operatorUsernames.filter(option => option.toLowerCase().includes(filterValue));
  }

  add() {
    this.dialogRef.close(this.collaboratorControl.value);
  }
}
