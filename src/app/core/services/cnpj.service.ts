import { Injectable } from '@angular/core';
import { CNPJ_API } from '../contantes/api-links';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CnpjService {
    private readonly cnpjUrl=CNPJ_API;
     constructor(private http:HttpClient) { }
     buscarCNPJ(cnpj:string): Observable<any>{
       return this.http.get(`${this.cnpjUrl}/${cnpj}`);
     
}
}
