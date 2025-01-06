import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RouterEnum } from '../const/router-enum';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class RolesGuard {
  constructor(private router: Router, private _authService: AuthService){}
  private routerEnum = RouterEnum;
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const usuarioLogado = this._authService.jwt.getValue();
    const routeRoles: Array<string> = route.data['roles'];
    const userRoles: Array<string> = usuarioLogado.authorities;
    let hasRole: boolean;
    
    if (routeRoles) {
      hasRole = routeRoles.some(routeRole => {
        const match = userRoles.some(userRole => userRole == routeRole);
        return match;
      });
    }

    if(!hasRole){
      this.router.navigate([this.routerEnum.LISTAGEM_DE_REGISTROS]);
      return false;
    }

    return true;
  }
}

export const RolesValidate: CanActivateFn = (route: ActivatedRouteSnapshot): boolean => {
  const guard = inject(RolesGuard);
  return guard.canActivate(route);
}
