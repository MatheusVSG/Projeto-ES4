import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CnpjService } from 'src/app/core/services/cnpj.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Cliente } from 'src/app/shared/models/Cliente';
import { ClienteService } from '../cliente.service';
import { validateCNPJ } from 'src/app/core/utils/validacao-documento';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(20px)' }), // <- da direita
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-20px)' })) // <- sai pela esquerda
      ])
    ])
  ]
})
export class CadastroClienteComponent {
  cliente: Cliente = new Cliente();

  numeroEndereco: string = '';
  estadosBrasileiros: string[];

  etapa: number = 1;
  etapaLimite: number = 4;
  errosFormuario: string[] = [];
  formularioRecebido: boolean = false;
  carregando: boolean = false;

  constructor(
    private locationService: LocationService,
    private cnpjService: CnpjService,
    private clienteService: ClienteService,
    private toastService: ToastrService
  ) {
    this.estadosBrasileiros = locationService.estadosBrasileiros;
  }

  voltarEtapa(): void {
    if (this.etapa > 1) {
      this.etapa--;
    }
  }

  validarCnpj(): void {
    if (this.cliente.cnpj.length === 14) {
      if (validateCNPJ(this.cliente.cnpj)) {
        this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'cnpj');
        this.verificarCnpjExistente();
      }
      else {
        this.toastService.error('CNPJ inválido.');
        if (!this.errosFormuario.includes('cnpj')) {
          this.errosFormuario.push('cnpj');
        }
      }
    }
  }

  verificarCnpjExistente(): void {
    const cnpj = this.cliente.cnpj;

    this.clienteService.verificarCnpjExistente(cnpj).subscribe({
      next: (res) => {
        if (res.status === 200) {
          this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'cnpj');
          this.buscarCnpj();
        }
      },
      error: (err) => {
        if (err.status === 409) {
          if (!this.errosFormuario.includes('cnpj')) {
            this.errosFormuario.push('cnpj');
            this.toastService.error('CNPJ já cadastrado.');
          }
        }
        else {
          this.toastService.error('Não foi possível verificar o CNPJ! Falha na requisição.');
        }
      }
    });
  }

  buscarCnpj(): void {
    const cnpj: string = this.cliente.cnpj;

    this.cnpjService.buscarCnpj(cnpj).subscribe({
      next: (res) => {
        if (Object.keys(res).length > 0) {
          this.cliente.nome = res.razao_social;
          this.cliente.nomeFantasia = res.nome_fantasia;
        }
      },
      error: (err) => {
        //console.error(err);
      }
    })
  }

  validarNome(): void {
    if (this.cliente.nome.trim().length > 0) {
      this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'nome');
    }
    else if (!this.errosFormuario.includes('nome')) {
      this.errosFormuario.push('nome');
    }
  }

  validarNomeFantasia(): void {
    if (this.cliente.nomeFantasia.trim().length > 0) {
      this.errosFormuario = this.errosFormuario.filter(erro => erro !== 'nomeFantasia');
    }
    else if (!this.errosFormuario.includes('nomeFantasia')) {
      this.errosFormuario.push('nomeFantasia');
    }
  }

  validarDadosPessoiais(dadosPessoais: NgForm): void {
    this.formularioRecebido = true;
    if (dadosPessoais.valid) {
      if (this.errosFormuario.length === 0 && this.etapa < this.etapaLimite) {
        if (this.cliente.dataAbertura) {
          const dataAberturaObj = new Date(this.cliente.dataAbertura);
          const [day, month, year] = [dataAberturaObj.getDay(), dataAberturaObj.getMonth() + 1, dataAberturaObj.getFullYear()];
          const dataAbertura = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          this.cliente.dataAbertura = dataAbertura;
        }
        else {
          this.cliente.dataAbertura = null;
        }
        
        this.formularioRecebido = false;
        this.etapa++;
        console.log(this.cliente)
      }
      else {
        this.toastService.error('Verifique se todas as informações estão corretas!');
      }
    } else {
      this.toastService.error('Verifique se todas as informações estão corretas!');
    }

  }

  verificarTelefoneExistente(): void {
    const telefone = this.cliente.ddd.toString() + this.cliente.telefone.toString();
    if (telefone.length < 11) {
      return;
    }

    this.clienteService.verificarTelefoneExistente(telefone).subscribe({
      next: (res) => {
        console.log(res)
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

    this.clienteService.verificarEmailExistente(email).subscribe({
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

  validarContato(contato: NgForm): void {
    this.formularioRecebido = true;
    if (contato.valid) {
      if (this.errosFormuario.length === 0 && this.etapa < this.etapaLimite) {
        this.formularioRecebido = false;
        this.etapa++;
      }
      else {
        this.toastService.error('Verifique se todas as informações estão corretas!');
      }
    } else {
      this.toastService.error('Verifique se todas as informações estão corretas!');
    }
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

  validarEndereco(endereco: NgForm): void {
    this.formularioRecebido = true;
    if (endereco.valid) {
      if (this.errosFormuario.length === 0 && this.etapa < this.etapaLimite) {
        this.formularioRecebido = false;
        this.etapa++;
      }
      else {
        this.toastService.error('Verifique se todas as informações estão corretas!');
      }
    } else {
      this.toastService.error('Verifique se todas as informações estão corretas!');
    }

  }

  cadastrarCliente(): void {
    this.carregando = true;
    this.cliente.logradouro = this.cliente.logradouro + `, ${this.numeroEndereco}`;
    const cliente: Cliente = this.cliente;

    this.clienteService.cadastrarCliente(cliente).subscribe({
      next: (res) => {
        this.toastService.success('Cliente cadastrado com sucessso.');
        this.etapa = 5;
      },
      error: (err) => {
        this.toastService.error('Não foi possível cadastrar o cliente! Falha na requisição.');
      },
      complete: () => {
        this.carregando = false;
      }
    });
  }

  cadastrarNovamente(): void {
    this.cliente.cnpj = '';
    this.cliente.dataAbertura = '';
    this.cliente.nome = '';
    this.cliente.nomeFantasia = '';
    this.cliente.loja = '';
    this.cliente.tipo = '';
    this.cliente.ddd = '';
    this.cliente.telefone = '';
    this.cliente.email = '';
    this.cliente.homePage = '';
    this.cliente.cep = '';
    this.cliente.logradouro = '';
    this.numeroEndereco = '';
    this.cliente.bairro = '';
    this.cliente.codMunicipio = '';
    this.cliente.municipio = '';
    this.cliente.estado = '';
    this.etapa = 1;
  }
}
