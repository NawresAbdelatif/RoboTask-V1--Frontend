import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatButton } from "@angular/material/button";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { RobotTaskService } from "../../Services/robot-task.service";
import { Router } from "@angular/router";
import { ApiResponse } from '../../Models/api-response.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signupForm: UntypedFormGroup;
  errorMsg = '';
  successMsg = '';
  hidePassword = true;
  loading = false;

  // Pour afficher les rôles dans le select (tu peux en rajouter ici)
  availableRoles = [
    { value: 'CREATOR', label: 'Créateur – Je veux créer et gérer des projets' },
    { value: 'EXECUTOR', label: 'Exécuteur – Je veux exécuter des tâches' }
  ];

  constructor(
      private robotTaskService: RobotTaskService,
      private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
      role: new UntypedFormControl('', Validators.required) // Ajout du champ rôle
    });
  }

  signup() {
    if (this.signupForm.invalid) return;
    const { username, email, password, role } = this.signupForm.value;

    const userPayload = {
      username,
      email,
      password,
      roles: [role] // envoie sous forme de tableau
    };

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.robotTaskService.signup(userPayload).subscribe({
      next: (res: ApiResponse) => {
        this.successMsg = "Merci de vérifier votre e-mail pour activer votre compte avant de vous connecter.";
        this.loading = false;
        this.signupForm.reset();
      },
      error: err => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Erreur lors de l’inscription';
        setTimeout(() => this.errorMsg = '', 4000);
      }
    });
  }
}
