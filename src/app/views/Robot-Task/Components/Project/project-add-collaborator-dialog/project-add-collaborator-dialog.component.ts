import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RobotTaskService } from '../../../Services/robot-task.service';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface CollaboratorOption {
  username: string;
  email: string;
}

@Component({
  selector: 'app-project-add-collaborator-dialog',
  templateUrl: './project-add-collaborator-dialog.component.html',
})
export class ProjectAddCollaboratorDialogComponent implements OnInit {
  collaboratorControl = new FormControl<CollaboratorOption | string>('');
  filteredOptions!: Observable<CollaboratorOption[]>;
  loading = false;
  errorMsg = '';
  constructor(
      private robotTaskService: RobotTaskService,
      public dialogRef: MatDialogRef<ProjectAddCollaboratorDialogComponent>,
  ) {}

  ngOnInit() {
    this.filteredOptions = this.collaboratorControl.valueChanges.pipe(
        debounceTime(250),
        switchMap(value => {
          if (!value || typeof value !== 'string' || value.trim() === '') return of([]);
          this.loading = true;
          return this.robotTaskService.searchCollaborators(value.trim()).pipe(
              map(users => {
                this.loading = false;
                return users;
              })
          );
        })
    );
  }

  displayFn(user: any): string {
    return user ? `${user.username} (${user.email})` : '';
  }

  add() {
    const val = this.collaboratorControl.value;
    if (val && typeof val === 'object' && val.email) {
      this.dialogRef.close(val.email); // On retourne l'email au parent
    } else {
      this.errorMsg = "Veuillez sélectionner un collaborateur dans la liste.";
    }
  }
}
