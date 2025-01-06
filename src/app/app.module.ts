import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { Approutes } from './app-routing.module';
import { PrincipalComponent } from './feature/principal/principal.component';
import { PrincipalModule } from './feature/principal/principal.module';
import { LoginModule } from './feature/login/login.module';
import { AppRoutingModule } from './app.routes';
import { CanActivateGuard } from './guards/auth.guard';
import { BarraDeNavegacaoComponent } from './components/barra-de-navegacao/barra-de-navegacao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';


@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    OAuthModule.forRoot(),
    AppRoutingModule,
    PrincipalModule,
    LoginModule,
    BarraDeNavegacaoComponent,
    NgbModule,
    FeatherModule,
    FeatherModule.pick(allIcons),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
