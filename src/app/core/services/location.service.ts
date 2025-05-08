import { Injectable } from '@angular/core';
import { VIA_CEP } from '../contantes/api-links';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
 private readonly viaCepUrl=VIA_CEP;
  constructor(private http:HttpClient) { }
  buscarendereco(cep:string): Observable<any>{
    return this.http.get(`${this.viaCepUrl}/${cep}/json/`);
  }
}
