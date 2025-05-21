import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClienteComponent } from './pages/cliente/cadastro-cliente/cadastro-cliente.component';
import { HomeComponent } from './home/home.component';
import { ListaClientesComponent } from './pages/cliente/lista-clientes/lista-clientes.component';
import { ClienteDetalhadoComponent } from './pages/cliente/cliente-detalhado/cliente-detalhado.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'cadastro-cliente',
    component: CadastroClienteComponent
  },

  {
    path: 'lista-clientes',
    component: ListaClientesComponent
  },

  {
    path: 'cliente-detalhado/:id',
    component: ClienteDetalhadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
