import { Injectable } from '@angular/core';
import { VIA_CEP } from '../contantes/api-links';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly viaCepUrl = VIA_CEP;
  estadosBrasileiros: string[] = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES",
    "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR",
    "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
    "SP", "SE", "TO"
  ];

  constructor(private http: HttpClient) { }
  buscarEndereco(cep: string): Observable<any> {
    return this.http.get(`${this.viaCepUrl}/${cep}/json/`, { observe: 'response' });
  }
}
