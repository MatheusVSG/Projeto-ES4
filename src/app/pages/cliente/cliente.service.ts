import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, of } from 'rxjs';
import { API_URL } from 'src/app/core/contantes/api-links';
import { Cliente } from 'src/app/shared/models/Cliente';
import { CookiesService } from 'src/app/shared/services/cookiesServices';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private readonly apiUrl = API_URL;

  constructor(
    private http: HttpClient,
    private cookiesService: CookiesService
  ) { }

  getAuthorization(): HttpHeaders {
    const token = this.cookiesService.getCookie('token');
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    return headers;
  }

  cadastrarCliente(cliente: Cliente): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.post(`${this.apiUrl}/cliente/cadastrar-cliente`, cliente, { headers });
  }

  listarClientes(): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.get(`${this.apiUrl}/cliente/listar-clientes`, {
      headers,
      observe: 'response'
    });
  }

  buscarClientesPorTermo(termo: string): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.get(`${this.apiUrl}/cliente/buscar-clientes-por-termo/${termo}`, { headers, observe: 'response' });
  }

  buscarClienteDetalhado(idCliente: number): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.get(`${this.apiUrl}/cliente/buscar-cliente-detalhado/${idCliente}`, { headers, observe: 'response' });
  }

  atualizarCliente(idCliente: number, cliente: Cliente): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.put(`${this.apiUrl}/cliente/atualizar-cliente/${idCliente}`, cliente, { headers, observe: 'response' });
  }

  excluirCliente(idCliente: number): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.delete(`${this.apiUrl}/cliente/excluir-cliente/${idCliente}`, { headers, observe: 'response' });
  }

  verificarCnpjExistente(cnpj: string): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.get(`${this.apiUrl}/cliente/verificar-cnpj/${cnpj}`, { headers, observe: 'response' });
  }

  verificarTelefoneExistente(ddd: string, telefone: string): Observable<any> {
    const headers = this.getAuthorization();

    const params = new HttpParams()
      .set('ddd', ddd)
      .set('telefone', telefone);

    return this.http.get(`${this.apiUrl}/cliente/verificar-telefone`, { headers, params, observe: 'response' });
  }

  verificarTelefoneExistenteComIdDiferente(ddd: string, telefone: string, idCliente: number): Observable<any> {
    const headers = this.getAuthorization();

    const params = new HttpParams()
      .set('ddd', ddd)
      .set('telefone', telefone)
      .set('id', idCliente);

    return this.http.get(`${this.apiUrl}/cliente/verificar-telefone/id-diferente`, { headers, params, observe: 'response' })
  }

  verificarEmailExistente(email: string): Observable<any> {
    const headers = this.getAuthorization();

    return this.http.get(`${this.apiUrl}/cliente/verificar-email/${email}`, { headers, observe: 'response' });
  }

  verificarEmailExistenteComIdDiferente(email: string, idCliente: number): Observable<any> {
    const headers = this.getAuthorization();

    const params = new HttpParams()
      .set('email', email)
      .set('id', idCliente);

    return this.http.get(`${this.apiUrl}/cliente/verificar-email`, { headers, params, observe: 'response' })
  }
}
