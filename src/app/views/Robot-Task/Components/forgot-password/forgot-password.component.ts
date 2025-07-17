import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RobotTaskService} from "../../Services/robot-task.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  form: FormGroup;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: RobotTaskService) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.auth.forgotPassword(this.form.value.email).subscribe({
      next: () => this.successMsg = "Un email de réinitialisation a été envoyé.",
      error: err => this.errorMsg = err.error?.message || "Erreur lors de l'envoi"
    });
  }
}
