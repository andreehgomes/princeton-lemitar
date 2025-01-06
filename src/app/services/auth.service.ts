import { Injectable } from '@angular/core';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { RouterEnum } from '../const/router-enum';
import { AccessToken } from '../interfaces/access-token';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly routerEnum = RouterEnum;

  private tokenUrl = 'https://auth-dev.princeton-lemitar.com.br/realms/princeton-lemitar/protocol/openid-connect/token';
  private clientId = 'sinple-web';
  private clientSecret = 'ZzVCevKWN9kQ1SNjahS6HhQ6yB4bqdc6';
  private grantType = "password";
  private scope = "user-sinple-web-roles"
  
  constructor(private oauthService: OAuthService, private http: HttpClient, private router: Router) {}

  jwt: BehaviorSubject<AccessToken> = new BehaviorSubject<AccessToken>(null);

  loginWithUsernamePassword(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('grant_type', this.grantType)
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('username', username)
      .set('password', password)
      .set('scope', this.scope);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(this.tokenUrl, body, { headers });
  }

  successLogin(response: LoginResponse) {
    this.oauthService.setStorage(localStorage);
    localStorage.setItem("access_token", response.access_token)
    localStorage.setItem("refresh_token", response.refresh_token)
    this.jwt.next(this.decodeJwt(response.access_token));
  }

  public logout(): void {
    this.oauthService.logOut();
    this.router.navigate([this.routerEnum.LOGIN])
  }

  decodeJwt(jwt: string): AccessToken{
    return jwtDecode(jwt);
  }

  returnHeaderAuthorization(): HttpHeaders {
    const token = this.oauthService.getAccessToken();
    const refresh_token = this.oauthService.getRefreshToken();
    const header: HttpHeaders = new HttpHeaders({ 'Authorization': `Bearer ${token}`, 'Accept': 'application/json'})
    return header;
  }
}
