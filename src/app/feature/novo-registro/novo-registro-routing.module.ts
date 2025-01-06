import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NovoRegistroComponent } from "./novo-registro.component";


const routes: Routes = [
  {
    path: "",
    component: NovoRegistroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NovoRegistroRoutingModule {}
