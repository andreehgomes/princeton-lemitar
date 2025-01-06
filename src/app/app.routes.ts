import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        loadChildren: () => import("./feature/login/login.module").then((m) => m.LoginModule),
        
    },
    {
        path: '',
        loadChildren: () => import("./feature/principal/principal.module").then((m) => m.PrincipalModule),
        canActivate: [authGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
