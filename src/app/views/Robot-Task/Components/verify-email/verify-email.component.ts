import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RobotTaskService } from '../../Services/robot-task.service';
import { ApiResponse } from '../../Models/api-response.model';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html'
})
export class VerifyEmailComponent implements OnInit {
  message = '';
  error = '';

  constructor(
      private route: ActivatedRoute,
      private robotTaskService: RobotTaskService
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.robotTaskService.verifyEmail(token).subscribe({
        next: (res: ApiResponse) => this.message = res.message || 'Compte activé avec succès !',
        error: (err) => this.error = err.error?.message || 'Erreur lors de la vérification'
      });
    } else {
      this.error = 'Lien de vérification invalide';
    }
  }
}
