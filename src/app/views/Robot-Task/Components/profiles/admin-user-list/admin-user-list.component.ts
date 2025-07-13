import { Component, HostListener, OnInit } from '@angular/core';
import { UserResponse } from "../../../Models/UserResponse.model";
import { RobotTaskService } from "../../../Services/robot-task.service";
import { getColorForUser } from "../../color.util";

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
  allAvailableRoles: string[] = ['ROLE_OPERATOR', 'ROLE_ADMIN', 'ROLE_VISITOR'];

  constructor(private userService: RobotTaskService) {}

  ngOnInit() {
    this.onResize();
    this.fetchUsers();
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
    this.userService.getUsers(this.search, this.selectedRole).subscribe({
      next: users => {
        this.users = users;
        // Correction sans erreur TS
        const allRoles: string[] = users.reduce((acc: string[], user) => {
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
}
