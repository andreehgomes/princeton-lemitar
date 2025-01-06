import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BancosResponse } from '../interfaces/bancos-response';
import { AuthService } from './auth.service';
import { Pagination } from '../interfaces/pagination';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private readonly base_url = "https://api-dev.princeton-lemitar.com.br/";
  private readonly bancos = "v1/bancos";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getListBancos(pagination: Pagination): Observable<BancosResponse>{
    return this.http.get<BancosResponse>(`${this.base_url}${this.bancos}`, { headers: this.authService.returnHeaderAuthorization() })
  }

}
