import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cliente } from 'src/app/shared/models/Cliente';
import { ClienteService } from '../cliente.service';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { CookiesService } from 'src/app/shared/services/cookiesServices';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit, OnDestroy {
  private buscaClientesSubject$ = new Subject<string>();
  private destroy$ = new Subject<void>();
  listaClientes: Cliente[] = [];
  idCliente: number | any;
  nomeCliente: string = '';
  carregando: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private cookiesService: CookiesService,
    private toastService: ToastrService,
  ) { }
  ngOnInit(): void {
    this.listarClientes();

    this.buscaClientesSubject$.pipe(
      debounceTime(500),
      switchMap((termo: any) =>
        this.clienteService.buscarClientesPorTermo(termo)),
      takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (res.status === 200) {
            if (res.body.length > 0) {
              this.listaClientes = res.body;
            }
            else {
              this.listaClientes = [];
            }
          }
        },
        error: (err) => {
          this.toastService.error('Não foi possível obter a lista de clientes! Tente novamente!');
        }
      });
  }

  listarClientes(): void {
    this.carregando = true;

    this.clienteService.listarClientes().subscribe({
      next: (res) => {
        if (res.status === 200) {
          if (res.body.length > 0) {
            this.listaClientes = res.body;
          }
          else {
            this.listaClientes = [];
          }
        }
      },
      error: (err) => {
        this.toastService.error('Não foi possível obter a lista de clientes! Tente novamente!');
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  buscarClientesPorTermo(event: any): void {
    const termo: string = event
    if (termo.trim().length === 0) {
      this.listaClientes = [];
      this.listarClientes();

      setTimeout(() => {
        return;
      }, 500)
    }
    else {
      this.buscaClientesSubject$.next(event);
    }
  }

  excluirCliente(idCliente: number, nomeCliente: string): void {
    this.idCliente = idCliente;
    this.nomeCliente = nomeCliente;

    const excluir = confirm(`Tem certeza que deseja excluir ${nomeCliente}? Esta ação não pode ser disfeita.`);

    if (excluir) {
      this.carregando = true;

      this.clienteService.excluirCliente(idCliente).subscribe({
        next: (res) => {
          if (res.status === 200) {
            this.toastService.success('Cliente excluído com sucesso!');
            this.listarClientes();
          }
        },
        error: (err) => {
          err.status === 404 ? this.toastService.error(`O cliente com o ID ${idCliente} não foi encontrado!`)
            : this.toastService.error(`Não foi possível excluir o cliente! Erro com o servidor!`);
        },
        complete: () => {
          this.carregando = false;
        }
      });
    }
    else {
      console.log('cancelar')
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
