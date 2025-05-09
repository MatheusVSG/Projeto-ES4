import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
}
