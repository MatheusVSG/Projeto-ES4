import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/core/contantes/api-links';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

    private readonly apiUrl=API_URL;
     constructor(private http:HttpClient) {}
     cadastrarCliente(cliente:object):Observable<any>{
      return this.http.post(`${this.apiUrl}/api/cliente/cadastrar-cliente`,cliente); 
     }
     

}
