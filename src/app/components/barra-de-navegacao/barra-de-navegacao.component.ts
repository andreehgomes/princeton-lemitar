import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RouterEnum } from '../../const/router-enum';

@Component({
  selector: 'barra-de-navegacao',
  standalone: true,
  imports: [],
  templateUrl: './barra-de-navegacao.component.html',
  styleUrl: './barra-de-navegacao.component.scss'
})
export class BarraDeNavegacaoComponent implements OnInit {

  readonly routerEnum = RouterEnum;
  nomeUsuario: string = "";
  constructor(private router: Router, private _authService: AuthService){
  }

  ngOnInit(): void {
    this._authService.jwt.subscribe((jwt) => {
      console.log('jwt: ', jwt)
      this.nomeUsuario = jwt.name
    })
  }
  
  goTo(rota: string) {
    this.router.navigate([rota])
  }

  logout(){
    this._authService.logout();
  }
}
