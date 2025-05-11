import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { API_URL } from 'src/app/core/contantes/api-links';
import { Cliente } from 'src/app/shared/models/Cliente';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiUrl = API_URL;

  constructor(private http: HttpClient) { }

  cadastrarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}/cliente/cadastrar-cliente`, cliente);
  }

  verificarCnpjExistente(cnpj: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/verificar-cnpj/${cnpj}`, {observe: 'response'});
  }

  verificarTelefoneExistente(telefone: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/verificar-telefone/${telefone}`, {observe: 'response'});
  }

  verificarEmailExistente(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/verificar-email/${email}`, {observe: 'response'});
  }
}
