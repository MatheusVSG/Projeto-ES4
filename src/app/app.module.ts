import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './pages/cliente/cadastro-cliente/cadastro-cliente.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListaClientesComponent } from './pages/cliente/lista-clientes/lista-clientes.component';
import { ClienteDetalhadoComponent } from './pages/cliente/cliente-detalhado/cliente-detalhado.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    HomeComponent,
    ListaClientesComponent,
    ClienteDetalhadoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
