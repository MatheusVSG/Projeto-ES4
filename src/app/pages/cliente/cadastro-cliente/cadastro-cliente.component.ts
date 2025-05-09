import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CnpjService } from 'src/app/core/services/cnpj.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Cliente } from 'src/app/shared/models/Cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {
  cliente: Cliente = new Cliente();
  nome: string = 'matheus';
  etapa: number = 1;
  etapaLimite: number = 4;

  constructor(
    private locationService: LocationService,
    private cnpjService: CnpjService,
    private clienteService: ClienteService
  ) { }

  voltarEtapa(): void {
    if (this.etapa > 1) {
      this.etapa--;
    }
  }

  buscarCnpj(): void {
    const cnpj: string = this.cliente.cnpj ?? '';

    this.cnpjService.buscarCnpj(cnpj).subscribe({
      next: (res) => {
        console.log(res)

      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  validarDadosPessoiais(dadosPessoais: NgForm): void {

    if (dadosPessoais.valid) {
      const dataAberturaObj = new Date(this.cliente.dataAbertura);

      const [day, month, year] = [dataAberturaObj.getDay(), dataAberturaObj.getMonth() + 1, dataAberturaObj.getFullYear()];
      const dataAbertura = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      this.cliente.dataAbertura = dataAbertura;

      console.log(dataAbertura)

      this.etapa++;
    } else {
      console.log('formulario invalido');
    }

  }

  validarContato(contato: NgForm): void {

    if (contato.valid) {
      this.etapa++;
    } else {
      console.log('formulario invalido');
    }

  }

  buscarEndereco(): void {
    const cep: string = this.cliente.cep ?? '';

    this.locationService.buscarendereco(cep).subscribe({
      next: (res) => {
        console.log(res)
        this.cliente.logradouro = res.logradouro;
        this.cliente.bairro = res.bairro;
        this.cliente.municipio = res.localidade;
        this.cliente.estado = res.uf;

      },
      error: (err) => {
        console.error(err)
      }
    })
  }

  validarEndereco(endereco: NgForm): void {

    if (endereco.valid) {
      this.cadastrarCliente();
    } else {
      console.log('formulario invalido');
    }

  }

  cadastrarCliente(): void {
    const cliente: Cliente = this.cliente;

    this.clienteService.cadastrarCliente(cliente).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

}
