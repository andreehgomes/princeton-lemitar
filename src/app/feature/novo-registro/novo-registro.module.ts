import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovoRegistroRoutingModule } from './novo-registro-routing.module';
import { NovoRegistroComponent } from './novo-registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarraDeNavegacaoComponent } from '../../components/barra-de-navegacao/barra-de-navegacao.component';



@NgModule({
  declarations: [NovoRegistroComponent],
  imports: [
    CommonModule,
    NovoRegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BarraDeNavegacaoComponent
  ]
})
export class NovoRegistroModule { }
