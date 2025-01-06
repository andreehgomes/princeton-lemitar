import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BancosResponse } from '../interfaces/bancos-response';
import { AuthService } from './auth.service';
import { Pagination } from '../interfaces/pagination';
import { BancosPayload } from '../interfaces/bancos-payload';

@Injectable({
  providedIn: 'root'
})
export class BancosService {

  private readonly base_url = "https://api-dev.princeton-lemitar.com.br/";
  private readonly bancos = "v1/bancos";

  constructor(private http: HttpClient, private authService: AuthService) { }

  getListBancos(pagination: Pagination): Observable<BancosResponse>{
    return this.http.get<BancosResponse>(`${this.base_url}${this.bancos}`, { headers: this.authService.returnHeaderAuthorization(), params: { ...pagination} })
  }

  getBancoById(id: number): Observable<BancosPayload>{
    return this.http.get<BancosPayload>(`${this.base_url}${this.bancos}/${id}`, { headers: this.authService.returnHeaderAuthorization()})
  }

  postNovoBanco(payload: BancosPayload): Observable<BancosPayload>{
    return this.http.post<BancosPayload>(`${this.base_url}${this.bancos}`, payload, { headers: this.authService.returnHeaderAuthorization() });
  }
  
  putNovoBanco(payload: BancosPayload): Observable<BancosPayload>{
    return this.http.put<BancosPayload>(`${this.base_url}${this.bancos}/${payload.id}`, payload, { headers: this.authService.returnHeaderAuthorization() });
  }

  deleteBancoById(id: number): Observable<any>{
    return this.http.delete(`${this.base_url}${this.bancos}/${id}`, { headers: this.authService.returnHeaderAuthorization() })
  }

}
