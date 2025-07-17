// src/app/shared/services/auth/jwt-auth-service.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JwtAuthService {
  private apiUrl = 'http://localhost:8090/api/auth';
  private _currentUser$ = new BehaviorSubject<any>(this.getStoredUser());
  public currentUser$ = this._currentUser$.asObservable();

  constructor(private http: HttpClient) {}

  // Pour lire l'user du localStorage au chargement du service
  private getStoredUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
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


    signup(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  getJwtToken(): string | null {
    return localStorage.getItem('token');
  }

  signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser$.next({});
    // Redirection optionnelle :
    // window.location.href = '/login';
  }
}
