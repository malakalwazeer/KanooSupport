import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://10.10.20.153:8000/api'; 
  constructor(private http: HttpClient, private router: Router) { }
  login(credentials: { UserName: string; Password: string }): Observable<any> {
    console.log(credentials)
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); 
      })
    );
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); 
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
