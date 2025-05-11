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
import { ClienteListaComponent } from './cliente-lista/cliente-lista.component';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr, ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    HomeComponent,
    ListaClientesComponent,
    ClienteDetalhadoComponent,
    ClienteListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    provideEnvironmentNgxMask(),
    provideAnimations(), // required animations providers
    provideToastr(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
