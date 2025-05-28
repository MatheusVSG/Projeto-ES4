import { Component, OnInit } from '@angular/core';
import { LoginDto } from 'src/app/shared/models/LoginDto';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CookiesService } from 'src/app/shared/services/cookiesServices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginDto: LoginDto = new LoginDto();
  usuarioValido: boolean = false;
  senhaValida: boolean = false;;
  formularioRecebido: boolean = false;
  carregando: boolean = false;

  constructor(
    private authService: AuthService,
    private cookiesServices: CookiesService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.cookiesServices.getCookie('token');
    if (token !== null) {
      this.router.navigateByUrl('/home');
    }
  }

  validarAuth(authForm: NgForm): void {
    this.formularioRecebido = true;
    this.usuarioValido = this.loginDto.usuario?.trim().length > 0;
    this.senhaValida = this.loginDto.senha?.trim().length > 0;

    if (!authForm.valid) {
      this.toastService.error('Usuário ou Senha inválidos!');
      return;
    }
    
    if (this.usuarioValido && this.senhaValida) {
      this.formularioRecebido = false;
      this.autenticar();
    } else {
      this.toastService.error('Usuário ou Senha inválidos!');
    }
  }

  autenticar(): void {
    this.carregando = true;
    this.authService.autenticar(this.loginDto).subscribe({
      next: (res) => {
        if (res.status === 200) {
          console.log(res);
          const token = res.body.token
          this.cookiesServices.setCookie('token', token, 1);
          this.router.navigateByUrl('/home');
        }
        this.carregando = false;
      },
      error: (err) => {
        err.status === 403 ? this.toastService.error('Usuário ou Senha inválidos!')
          : this.toastService.error('Não foi possível efetuar o login! Tente novamente mais tarde!');
        this.carregando = false;
      }
    })
  }
}
