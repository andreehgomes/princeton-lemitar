import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  standalone: false,
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {
  isRootRoute: boolean = true;

  constructor(private router: Router){
    this.router.events.subscribe(() => {
      this.isRootRoute = this.router.url === '/';
    });
  }
}
