import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CnpjService } from 'src/app/core/services/cnpj.service';
import { LocationService } from 'src/app/core/services/location.service';
import { Cliente } from 'src/app/shared/models/Cliente';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent {
  cliente: Cliente = new Cliente();
  nome: string = 'matheus';
  etapa: number = 1;

  constructor(private locationService: LocationService, 
    private cnpjService:CnpjService){}

  validarforms(dadospessoais: NgForm) {

    if (dadospessoais.valid) {

      console.log(this.cliente);
      this.etapa++;
    } else {
      console.log('formulario invalido');
    }

  }

  voltarEtapa() {
    if (this.etapa > 1) {
      this.etapa--;
    }
  }

  buscarEndereco(){
    const cep: string = this.cliente.cep ?? '';

    this.locationService.buscarendereco(cep).subscribe({
      next: (res) => {
        console.log(res)
        this.cliente.logradouro=res.logradouro;
        this.cliente.bairro=res.bairro;
        this.cliente.municipio=res.localidade;
        this.cliente.estado=res.uf;

      },
      error: (err) => {
        console.error(err)
      }
    })

  }

  buscarCnpj(){
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
cadastraCliente(){
  
}

}
