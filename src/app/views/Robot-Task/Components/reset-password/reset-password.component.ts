import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RobotTaskService} from "../../Services/robot-task.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  token = '';
  successMsg = '';
  errorMsg = '';
  loading = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private auth: RobotTaskService
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.resetPassword(this.token, this.form.value.newPassword).subscribe({
      next: () => {
        this.successMsg = "Mot de passe réinitialisé. Vous pouvez vous connecter !";
        setTimeout(() => this.router.navigate(['/pages/signin']), 2500);
      },
      error: err => {
        this.errorMsg = err.error?.message || "Erreur lors de la réinitialisation";
        this.loading = false;
      }
    });
  }
}
