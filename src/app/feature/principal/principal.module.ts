import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalRoutingModule } from './principal-routing.module';
import { BarraDeNavegacaoComponent } from '../../components/barra-de-navegacao/barra-de-navegacao.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { PrincipalComponent } from './principal.component';



@NgModule({
  declarations: [PrincipalComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    RouterOutlet,
    RouterModule,
    BarraDeNavegacaoComponent
  ]
})
export class PrincipalModule { }
