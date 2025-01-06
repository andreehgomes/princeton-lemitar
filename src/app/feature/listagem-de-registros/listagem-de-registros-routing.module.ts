import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListagemDeRegistrosComponent } from "./listagem-de-registros.component";


const routes: Routes = [
  {
    path: "",
    component: ListagemDeRegistrosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListagemDeRegistrosRoutingModule {}
