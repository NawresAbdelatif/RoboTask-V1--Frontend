// src/app/pages/activate/activate.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  message = '';
  loading = true;
  success = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.http.get<any>('http://localhost:8090/api/auth/verify?token=' + token).subscribe({
        next: (res) => {
          this.message = "🎉 Votre compte a été activé avec succès ! Vous pouvez maintenant vous connecter.";
          this.success = true;
          this.loading = false;
        },
        error: (err) => {
          this.message = err.error?.message || 'Lien d’activation invalide ou expiré.';
          this.success = false;
          this.loading = false;
        }
      });
    } else {
      this.message = 'Lien invalide ou manquant.';
      this.success = false;
      this.loading = false;
    }
  }

  goToLogin() {
    this.router.navigate(['/pages/signin']);
  }
}
