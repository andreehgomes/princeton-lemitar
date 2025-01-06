import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import("./feature/login/login.module").then((m) => m.LoginModule),
        
    },
    {
        path: '',
        loadChildren: () => import("./feature/principal/principal.module").then((m) => m.PrincipalModule),
        canActivate: [authGuard],
    },
    {
        path: 'listagem-de-registros',
        loadChildren: () => import("./feature/listagem-de-registros/listagem-de-registros.module").then((m) => m.ListagemDeRegistrosModule),
        canActivate: [authGuard],
    },
    {
        path: 'novo-registro',
        loadChildren: () => import("./feature/novo-registro/novo-registro.module").then((m) => m.NovoRegistroModule),
        canActivate: [authGuard],
    },
    {
        path: 'editar-registro/:id',
        loadChildren: () => import("./feature/novo-registro/novo-registro.module").then((m) => m.NovoRegistroModule),
        canActivate: [authGuard],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
