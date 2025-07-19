import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable,BehaviorSubject} from 'rxjs';
import {JwtResponse} from "../Models/jwt-response.model";
import {LoginRequest} from "../Models/login-request.model";
import {SignupRequest} from "../Models/signup-request.model";
import {ProjectResponse} from "../Models/project-response.model";
import {Notification} from "../Models/notfication.model";
import {ProjectRequest} from "../Models/project-request.model";
import {LogEntry} from "../Models/log-entry.model";
import { tap } from 'rxjs/operators';
import {ApiResponse} from "../Models/api-response.model";
import {UserResponse} from "../Models/UserResponse.model";
import {UserProfile} from "../Models/user-profile.model";
import {UserProfileUpdate} from "../Models/user-profile-update.model";
import {PasswordChange} from "../Models/password-change.model";

@Injectable({
  providedIn: 'root'
})
export class RobotTaskService {
  private apiUrl = 'http://localhost:8090/api/auth';
  private apiprojectUrl = 'http://localhost:8090/api/projects';
  private apinotificationUrl = 'http://localhost:8090/api/notifications';
  private apilogsUrl = 'http://localhost:8090/api/logs';
  private _currentUser$ = new BehaviorSubject<any>(this.getStoredUser());
  public currentUser$ = this._currentUser$.asObservable();
  constructor(private http: HttpClient) {}

  // signin(username: string, password: string): Observable<JwtResponse> {
  //   const data: LoginRequest = { username, password };
  //   return this.http.post<JwtResponse>(`${this.apiUrl}/login`, data);
  // }
  private getStoredUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // getUsers(query: string = '', role: string = ''): Observable<UserResponse[]> {
  //   let params = new HttpParams();
  //   if (query) params = params.set('q', query);
  //   if (role && role !== 'all') params = params.set('role', role);
  //   return this.http.get<UserResponse[]>(`${this.apiUrl}/users`, { params });
  // }

  getUsers(search: string, role: string, page: number = 0, size: number = 10) {
    const params = {
      search,
      role,
      page: page.toString(),
      size: size.toString()
    };
    return this.http.get<any>(`${this.apiUrl}/users`, { params });
  }



  updateUserRole(userId: number, newRole: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/role`, { role: newRole });
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }
  setUserEnabled(userId: number, enabled: boolean) {
    return this.http.put(`${this.apiUrl}/users/${userId}/enabled`, { enabled });
  }


  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
        .pipe(
            tap(response => {
              localStorage.setItem('token', response.token);
              localStorage.setItem('user', JSON.stringify({
                username: response.username,
                roles: response.roles
              }));
              this._currentUser$.next({
                username: response.username,
                roles: response.roles
              });
            })
        );
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/profile`);
  }

  updateProfile(profile: UserProfileUpdate): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/updateProfile`, profile);
  }


  changePassword(data: PasswordChange): Observable<any> {
    return this.http.put(`${this.apiUrl}/password`, data);
  }
  getRoles(): string[] {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.roles ?? [];
  }

  hasRole(role: string): boolean {
    return this.getRoles().includes(role);
  }

  // signup(userData: SignupRequest): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/register`, userData);
  // }
  signup(userData: SignupRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/register`, userData);
  }
  verifyEmail(token: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiUrl}/verify?token=${token}`);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password?token=${token}`, { password: newPassword });
  }

  //////////////////////Logs///////////////////////

  getLogs(page = 0, size = 8): Observable<{ content: LogEntry[], totalElements: number }> {
    return this.http.get<{ content: LogEntry[], totalElements: number }>(`${this.apilogsUrl}?page=${page}&size=${size}`);
  }
  clearLogs(): Observable<void> {
    return this.http.delete<void>(`${this.apilogsUrl}/clear`);
  }

  //////////////////////Projects///////////////////////

  getAllProjects(page: number = 0, size: number = 5): Observable<{ content: ProjectResponse[], totalElements: number }> {
    return this.http.get<{ content: ProjectResponse[], totalElements: number }>(`${this.apiprojectUrl}?page=${page}&size=${size}`);
  }
  createProject(projectData: ProjectRequest): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(this.apiprojectUrl + '/create', projectData);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.apiprojectUrl}/${projectId}/delete`);
  }

  updateProject(id: number, projectData: ProjectRequest): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(`${this.apiprojectUrl}/${id}/update`, projectData);
  }
  getProjectById(id: number): Observable<ProjectResponse> {
    return this.http.get<ProjectResponse>(`${this.apiprojectUrl}/${id}`);
  }

  getOperatorUsernames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiprojectUrl + '/operators');
  }
  addCollaborator(projectId: number, collaboratorUsername: string): Observable<any> {
    return this.http.post(`${this.apiprojectUrl}/${projectId}/add-collaborator?collaboratorUsername=${encodeURIComponent(collaboratorUsername)}`, {});
  }
  searchCollaborators(q: string) {
    return this.http.get<{username: string, email: string}[]>(`${this.apiprojectUrl}/collaborators/search`, { params: { q } });
  }

  searchProjects(search: string, status?: string, page: number = 0, size: number = 5): Observable<{ content: ProjectResponse[], totalElements: number }> {
    let url = `${this.apiprojectUrl}/search?search=${encodeURIComponent(search)}&page=${page}&size=${size}`;
    if (status) url += `&status=${status}`;
    return this.http.get<{ content: ProjectResponse[], totalElements: number }>(url);
  }
  getProjectsCountByYear(): Observable<{[year: string]: number}> {
    return this.http.get<{[year: string]: number}>(`${this.apiprojectUrl}/stats/by-year`);
  }
  getProjectsCountByStatus() {
    return this.http.get<{ [status: string]: number }>(`${this.apiprojectUrl}/stats/by-status`);
  }

  archiveProject(projectId: number): Observable<any> {
    return this.http.put(`${this.apiprojectUrl}/${projectId}/archive`, {});
  }

  getArchivedProjects(page: number = 0, size: number = 5): Observable<{ content: ProjectResponse[], totalElements: number }> {
    return this.http.get<{ content: ProjectResponse[], totalElements: number }>(`${this.apiprojectUrl}/archived?page=${page}&size=${size}`);
  }

  unarchiveProject(projectId: number): Observable<any> {
    return this.http.put(`${this.apiprojectUrl}/${projectId}/unarchive`, {});
  }


  ////////////////////Notification////////////////////

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.apinotificationUrl);
  }

  getUnreadCount(): Observable<{ unreadCount: number }> {
    return this.http.get<{ unreadCount: number }>(`${this.apinotificationUrl}/unread-count`);
  }

  markAllAsRead(): Observable<any> {
    return this.http.post(`${this.apinotificationUrl}/mark-all-read`, {});
  }

  clearNotifications(): Observable<any> {
    return this.http.post(`${this.apinotificationUrl}/clear`, {});
  }

}
