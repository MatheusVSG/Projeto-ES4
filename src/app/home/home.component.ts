import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../shared/models/Cliente';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  cliente: Cliente = new Cliente();
  nome: string = 'matheus';
  etapa: number = 1;
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


}
