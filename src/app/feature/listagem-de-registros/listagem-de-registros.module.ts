import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemDeRegistrosRoutingModule } from './listagem-de-registros-routing.module';
import { ListagemDeRegistrosComponent } from './listagem-de-registros.component';
import { BarraDeNavegacaoComponent } from '../../components/barra-de-navegacao/barra-de-navegacao.component';



@NgModule({
  declarations: [ListagemDeRegistrosComponent],
  imports: [
    CommonModule,
    ListagemDeRegistrosRoutingModule,
    BarraDeNavegacaoComponent
  ]
})
export class ListagemDeRegistrosModule { }
