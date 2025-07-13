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

  constructor(
      private robotTaskService: RobotTaskService,
      private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = new UntypedFormGroup({
      username: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid) return;
    const userPayload = this.signupForm.value;

    this.loading = true;
    this.errorMsg = '';
    this.successMsg = '';

    this.robotTaskService.signup(userPayload).subscribe({
      next: (res: ApiResponse) => {
        this.successMsg = res.message;
        this.loading = false;
        setTimeout(() => {
          this.successMsg = '';
          this.router.navigate(['/pages/signin']);
        }, 1800);
      },
      error: err => {
        this.loading = false;
        this.errorMsg = err.error?.message || 'Erreur lors de l’inscription';
        setTimeout(() => this.errorMsg = '', 4000);
      }
    });
  }
}
