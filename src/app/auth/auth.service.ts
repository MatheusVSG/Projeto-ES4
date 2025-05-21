import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../core/contantes/api-links';
import { LoginDto } from '../shared/models/LoginDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  autenticar(loginDto: LoginDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, loginDto, { observe: 'response' });
  }
}
