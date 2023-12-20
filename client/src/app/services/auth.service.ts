import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    this.checkInitialAuthState();
  }

  private checkInitialAuthState() {
    this.checkAuthStatus().pipe(
      map(user => !!user),
      catchError(() => of(false))
    ).subscribe(isLoggedIn => this.loggedIn.next(isLoggedIn));
  }

  checkAuthStatus() {
    return this.http.get('http://localhost:8000/api/auth/me', { withCredentials: true });
  }

  logout() {
    this.loggedIn.next(false);
    return this.http.get('http://localhost:8000/api/auth/logout', { withCredentials: true });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/login', { username, password }, { withCredentials: true });
  }

}
