import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface Cliente {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClienteService {

  private clientes: Cliente[] = [
    { id: 1, nome: 'João Silva', email: 'joao@email.com' },
    { id: 2, nome: 'Maria Oliveira', email: 'maria@email.com' },
    { id: 3, nome: 'Carlos Souza', email: 'carlos@email.com' },
    { id: 4, nome: 'Ana Costa', email: 'ana@email.com' },
    { id: 5, nome: 'Lucas Pereira', email: 'lucas@email.com' },
    { id: 6, nome: 'Fernanda Lima', email: 'fernanda@email.com' },
    { id: 7, nome: 'Ricardo Santos', email: 'ricardo@email.com' },
    { id: 8, nome: 'Juliana Rocha', email: 'juliana@email.com' },
    { id: 9, nome: 'Marcelo Gomes', email: 'marcelo@email.com' },
    { id: 10, nome: 'Patrícia Alves', email: 'patricia@email.com' },
    { id: 11, nome: 'Roberta Martins', email: 'roberta@email.com' },
    { id: 12, nome: 'Tiago Ferreira', email: 'tiago@email.com' },
    { id: 13, nome: 'Ricardo Pinto', email: 'ricardo.pinto@email.com' },
    { id: 14, nome: 'José Carvalho', email: 'jose@email.com' },
    { id: 15, nome: 'Camila Souza', email: 'camila@email.com' },
  ];

  constructor() {}

  getClientes(): Observable<Cliente[]> {
    return of(this.clientes);
  }
}
