import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { RouterEnum } from '../const/router-enum';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CanActivateGuard{
  readonly routerEnum = RouterEnum;
  constructor(private router: Router, private oauthService: OAuthService){}
  canActivate(): boolean {
    console.log('this.oauthService.hasValidAccessToken(): ', this.oauthService.hasValidAccessToken())
    if(this.oauthService.hasValidAccessToken()){
      return true
    }else{
      this.router.navigate([this.routerEnum.LOGIN]);
      return false;
    }
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(CanActivateGuard).canActivate();
};
