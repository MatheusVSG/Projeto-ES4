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
  formularioRecebido: boolean = false;

  constructor(
    private authService: AuthService,
    private cookiesServices: CookiesService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.cookiesServices.getCookie('token');
    if(token !== null){
      this.router.navigateByUrl('/home');
    }
  }

  validarAuth(authForm: NgForm): void {
    this.formularioRecebido = true;

    if (!authForm.valid) {
      this.toastService.error('Usuário ou Senha inválidos!');
      return;
    }

    const usuarioValido = this.loginDto.usuario?.trim().length > 0;
    const senhaValida = this.loginDto.senha?.trim().length > 0;

    if (usuarioValido && senhaValida) {
      this.formularioRecebido = false;
      this.autenticar();
    } else {
      this.toastService.error('Usuário ou Senha inválidos!');
    }
  }

  autenticar(): void {
    this.authService.autenticar(this.loginDto).subscribe({
      next: (res) => {
        
        if (res.status === 200) {
          console.log(res);
          const token = res.body.token
          this.cookiesServices.setCookie('token', token, 1);
        }

      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
