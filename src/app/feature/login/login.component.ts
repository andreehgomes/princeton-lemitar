import { Component } from '@angular/core';
import { RouterEnum } from '../../const/router-enum';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from '../../interfaces/login-response';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  readonly reouterEnum = RouterEnum;
  constructor(private _authService: AuthService, private router: Router, private oauthService: OAuthService){}

  formLogin = new FormGroup({
    formControlUser: new FormControl('devadmin', [Validators.required]),
    formControlPass: new FormControl('admin@123', [Validators.required])
    })

  onSubmitLogin(){
    const { formControlPass, formControlUser } = this.formLogin.controls;
    this.login(formControlUser.value, formControlPass.value);
  }

  login(user: string, pass: string){
    this._authService.loginWithUsernamePassword(user, pass).subscribe(({
      next: (user) => {
        this._authService.successLogin(user);
      },
      error: (error) => {
        console.error('ERROR - LOGIN: ', error)
      },
      complete: () => {
        this.router.navigate([this.reouterEnum.PRINCIPAL]);
      }
    }))
  }

  successLogin(response: LoginResponse) {
    this.oauthService.setStorage(localStorage);
    this.oauthService.loadUserProfile();
  }

  logout(){
    this._authService.logout();
  }

}