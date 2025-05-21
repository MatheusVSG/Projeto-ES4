import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CnpjService } from 'src/app/core/services/cnpj.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Cliente } from 'src/app/shared/models/Cliente';
import { ClienteService } from '../cliente.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cliente-detalhado',
  templateUrl: './cliente-detalhado.component.html',
  styleUrls: ['./cliente-detalhado.component.css']
})
export class ClienteDetalhadoComponent implements OnInit {
  cliente: Cliente = new Cliente();
  idCliente: number | null = null;

  numeroEndereco: string = '';
  estadosBrasileiros: string[] = [];

  errosFormuario: string[] = [];
  formularioRecebido: boolean = false;
  carregando: boolean = false;

  constructor(
    private router: Router,
    private locationService: LocationService,
    private cnpjService: CnpjService,
    private clienteService: ClienteService,
    private toastService: ToastrService
  ) {
    this.idCliente = Number(this.router.url.split('/')[2]);
    this.estadosBrasileiros = locationService.estadosBrasileiros;
  }
  ngOnInit(): void {
    this.buscarClienteDetalhado();
  }

  buscarClienteDetalhado(): void {
    this.carregando = true;

    this.clienteService.buscarClienteDetalhado(this.idCliente ?? 0).subscribe({
      next: (res) => {
        if (res.status === 200 && res.body && Object.keys(res.body).length > 0) {
          this.cliente = res.body;
          this.numeroEndereco = this.cliente.logradouro.split(',')[1].trim();
        } else {
          this.toastService.error('Cliente não encontrado. Verifique o código informado.');
          this.router.navigateByUrl('/lista-clientes');
        }
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar os dados do cliente. Por favor, tente novamente mais tarde.');
        this.carregando = false;
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  validarNomeFantasia(): void {
    if (this.cliente.nomeFantasia.trim().length > 0) {
      this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'nomeFantasia');
    }
    else if (!this.errosFormuario.includes('nomeFantasia')) {
      this.errosFormuario.push('nomeFantasia');
    }
  }

  verificarTelefoneExistente(): void {
    const ddd = this.cliente.ddd;
    const telefone = this.cliente.telefone;
    if (ddd.length < 2 || telefone.length < 9) {
      return;
    }

    this.clienteService.verificarTelefoneExistenteComIdDiferente(ddd, telefone, this.idCliente ?? 0).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'telefone');
        }
      },
      error: (err) => {
        if (err.status === 409) {
          if (!this.errosFormuario.includes('telefone')) {
            this.errosFormuario.push('telefone');
            this.toastService.error('Telefone já cadastrado.');
          }
        }
        else {
          this.toastService.error('Não foi possível verificar o Telefone! Falha na requisição.');
        }
      }
    });
  }

  verificarEmailExistente(): void {
    const email = this.cliente.email;

    this.clienteService.verificarEmailExistenteComIdDiferente(email, this.idCliente ?? 0).subscribe({
      next: (res) => {
        console.log(res)
        if (res.status === 200) {
          this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'e-mail');
        }
      },
      error: (err) => {
        if (err.status === 409) {
          if (!this.errosFormuario.includes('e-mail')) {
            this.errosFormuario.push('e-mail');
            this.toastService.error('E-mail já cadastrado.');
          }
        }
        else {
          this.toastService.error('Não foi possível verificar o Telefone! Falha na requisição.');
        }
      }
    });
  }

  buscarEndereco(): void {
    const cep: string = this.cliente.cep;

    if (cep.length < 8) {
      return;
    }

    this.locationService.buscarEndereco(cep).subscribe({
      next: (res) => {
        if (res.status === 200) {
          const body = res.body;
          this.cliente.logradouro = body.logradouro;
          this.cliente.bairro = body.bairro;
          this.cliente.municipio = body.localidade;
          this.cliente.estado = body.uf;
          this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'logradouro' && erro !== 'municipio');
        }
      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  validarLogradouro(): void {
    if (this.cliente.logradouro.trim().length > 0) {
      this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'logradouro');
    }
    else if (!this.errosFormuario.includes('logradouro')) {
      this.errosFormuario.push('logradouro');
    }
  }

  validarMunicipio(): void {
    if (this.cliente.municipio.trim().length > 0) {
      this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'municipio');
    }
    else if (!this.errosFormuario.includes('municipio')) {
      this.errosFormuario.push('municipio');
    }
  }

  validarCliente(clienteForm: NgForm): void {
    this.formularioRecebido = true;

    if (clienteForm.valid) {
      if (this.errosFormuario.length === 0) {
        const logradouro = this.cliente.logradouro.split(',')[0];
        this.cliente.logradouro = `${logradouro}, ${this.numeroEndereco}`;
        this.formularioRecebido = false;

        this.cliente.dataAbertura = this.cliente.dataAbertura || null;

        this.atualizarCliente();
      }
      else {
        this.toastService.error('Verifique se todas as informações estão corretas!');
      }
    }
    else {
      this.toastService.error('Verifique se todas as informações estão corretas!');
    }
  }

  atualizarCliente(): void {
    this.carregando = true;

    this.clienteService.atualizarCliente(this.idCliente ?? 0, this.cliente).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.toastService.success('Cliente atualizado com sucesso!');
        }
      },
      error: (err) => {
        if (err.status === 404) {
          this.toastService.error('Cliente não encontrado. Verifique se o ID está correto.');
        } else {
          this.toastService.error('Erro ao atualizar o cliente. Tente novamente mais tarde.');
        }
        this.carregando = false;
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }
}
