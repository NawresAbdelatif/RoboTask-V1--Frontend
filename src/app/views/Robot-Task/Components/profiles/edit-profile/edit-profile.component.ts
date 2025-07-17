import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfile } from '../../../Models/user-profile.model';
import { UserProfileUpdate } from '../../../Models/user-profile-update.model';
import { PasswordChange } from '../../../Models/password-change.model';
import { RobotTaskService } from '../../../Services/robot-task.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profile: UserProfile | null = null;
  editData: UserProfileUpdate = { username: '', email: '' };
  passwordData: PasswordChange = { oldPassword: '', newPassword: '' };
  editMode = false;
  message = '';
  passwordMessage = '';
  showOldPassword = false;
  showNewPassword = false;

  constructor(
      private robotTaskService: RobotTaskService,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.robotTaskService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.editData.username = data.username;
        this.editData.email = data.email;
      }
    });
  }

  saveProfile() {
    this.robotTaskService.updateProfile(this.editData).subscribe({
      next: (data: any) => {
        const usernameChanged = this.editData.username !== this.profile?.username;

        if (usernameChanged) {
          this.message = "Votre nom d'utilisateur a été modifié. Merci de vous reconnecter.";
          setTimeout(() => {
            localStorage.clear();
            this.router.navigate(['/pages/signin']);
          }, 2000);
        } else if (data.profile) {
          this.profile = data.profile;
          this.editData.username = data.profile.username;
          this.editData.email = data.profile.email;
          this.editMode = false;
          this.message = 'Profil mis à jour !';
        }
      },
      error: (err) => {
        if ([400, 401, 403].includes(err.status)) {
          this.message = "Votre profil a été mis à jour. Merci de vous reconnecter.";
          setTimeout(() => {
            localStorage.clear();
            this.router.navigate(['/pages/signin']);
          }, 2000);
        } else {
          this.message = err.error?.message || 'Erreur de mise à jour';
        }
      }
    });
  }

  changePassword() {
    this.robotTaskService.changePassword(this.passwordData).subscribe({
      next: () => {
        this.passwordMessage = 'Mot de passe changé, veuillez vous reconnecter.';
        setTimeout(() => {
          localStorage.clear();
          this.router.navigate(['/pages/signin']);
        }, 2000);
      },
      error: (err) => {
        this.passwordMessage = err.error?.message || 'Erreur de changement de mot de passe';
      }
    });
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'ROLE_ADMIN': return 'ADMIN';
      case 'ROLE_EXECUTOR': return 'Exécuteur';
      case 'ROLE_CREATOR': return 'Créateur';
      case 'ROLE_VISITOR': return 'Visiteur';
      default: return role;
    }
  }
}
