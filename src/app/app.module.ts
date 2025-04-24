import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponentComponent,
    CadastroClienteComponent,
    HomeComponent,
    SideBarComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
