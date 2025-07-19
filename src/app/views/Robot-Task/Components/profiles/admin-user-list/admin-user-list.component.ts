import { Component, HostListener, OnInit } from '@angular/core';
import { UserResponse } from "../../../Models/UserResponse.model";
import { RobotTaskService } from "../../../Services/robot-task.service";
import { getColorForUser } from "../../color.util";
import { MatSnackBar } from '@angular/material/snack-bar';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  users: UserResponse[] = [];
  loading = true;
  errorMsg = '';
  isDesktop = false;
  search = '';
  selectedRole = 'all';
  roles: string[] = [];
  displayedColumns = ['username', 'email', 'roles'];
  selectedUserForRoleMenu: UserResponse | null = null;
  allAvailableRoles: string[] = [
    'ROLE_ADMIN',
    'ROLE_CREATOR',
    'ROLE_EXECUTOR',

  ];
  roleLabels: Record<string, string> = {
    'ROLE_ADMIN': 'Admin',
    'ROLE_CREATOR': 'Créateur',
    'ROLE_EXECUTOR': 'Exécuteur',
  };
  successMsg = '';
  currentUserId: number | null = null;

  totalItems = 0;
  totalPages = 0;
  currentPage = 0;
  pageSize = 10;

  constructor(private userService: RobotTaskService,private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.onResize();
    this.fetchUsers(); // affiche tous les utilisateurs au début
    this.userService.getProfile().subscribe({
      next: user => this.currentUserId = user.id,
      error: _ => this.currentUserId = null
    });
  }
  getColorForUser(username: string) {
    return getColorForUser(username);
  }

  @HostListener('window:resize')
  onResize() {
    this.isDesktop = window.innerWidth >= 900;
  }

  fetchUsers() {
    this.loading = true;
    this.userService.getUsers(this.search.trim(), this.selectedRole, this.currentPage, this.pageSize).subscribe({
      next: res => {
        this.users = res.users;
        this.totalItems = res.totalItems;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        const allRoles: string[] = this.users.reduce((acc: string[], user) => {
          if (user.roles && Array.isArray(user.roles)) {
            acc.push(...user.roles.filter(r => typeof r === 'string'));
          }
          return acc;
        }, []);
        this.roles = Array.from(new Set(allRoles)).sort();
        this.loading = false;
      },
      error: err => {
        this.errorMsg = err.error?.message || 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }

  setUserRole(user: UserResponse, role: string) {
    if (user.roles.includes(role)) return;
    this.userService.updateUserRole(user.id, role).subscribe({
      next: _ => {
        user.roles = [role];
      },
      error: err => {
        this.errorMsg = err.error?.message || 'Erreur lors du changement de rôle';
      }
    });
  }



  onSearchChange(value: string) {
    this.search = value;
    this.fetchUsers();
  }

  onRoleChange(role: string) {
    this.selectedRole = role;
    this.fetchUsers();
  }

  displayRole(role: string): string {
    return this.roleLabels[role] || role;
  }


  confirmDeleteUser(user: UserResponse) {
    if (confirm(`Supprimer l'utilisateur ${user.username} ?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
          // Affiche la Snackbar stylée ici
          this.snackBar.open(
              `✅ Utilisateur "${user.username}" supprimé avec succès !`,
              'Fermer',
              {
                duration: 4000,
                panelClass: ['snackbar-success'] // Pour custom le style !
              }
          );
        },
        error: err => {
          this.errorMsg = err.error?.message || 'Erreur lors de la suppression';
          this.snackBar.open(
              `❌ ${this.errorMsg}`,
              'Fermer',
              { duration: 4000, panelClass: ['snackbar-error'] }
          );
        }
      });
    }
  }
  toggleUserEnabled(user: UserResponse) {
    const enabled = !user.enabled; // On inverse la valeur actuelle
    this.userService.setUserEnabled(user.id, enabled).subscribe({
      next: () => {
        user.enabled = enabled;
        this.snackBar.open(
            `✅ Compte "${user.username}" ${enabled ? 'activé' : 'désactivé'} avec succès !`,
            'Fermer',
            { duration: 3000, panelClass: ['snackbar-success'] }
        );
      },
      error: err => {
        this.errorMsg = err.error?.message || "Erreur lors de l'activation/désactivation";
        this.snackBar.open(
            `❌ ${this.errorMsg}`,
            'Fermer',
            { duration: 4000, panelClass: ['snackbar-error'] }
        );
      }
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchUsers();
  }
  onPaginatorChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchUsers();
  }

}


