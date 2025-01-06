import { Component, OnInit } from '@angular/core';
import { BancosService } from '../../services/bancos.service';
import { Pagination } from '../../interfaces/pagination';
import { ArrayColumnResponsiveTable } from '../../components/responsive-table/model/columns-responsive-table';
import { BancosResponse } from '../../interfaces/bancos-response';
import { Router } from '@angular/router';
import { RouterEnum } from '../../const/router-enum';
import { AccessToken } from '../../interfaces/access-token';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listagem-de-registros',
  standalone: false,
  templateUrl: './listagem-de-registros.component.html',
  styleUrl: './listagem-de-registros.component.scss'
})
export class ListagemDeRegistrosComponent implements OnInit {
  usuarioLogado: AccessToken;
  readonly routerEnum = RouterEnum;

  pagination: Pagination = {
    pageNumber: 0,
    pageSize: 10
  }

  bancos: BancosResponse;
  protected showTable: boolean = false;
  protected columnsTable: ArrayColumnResponsiveTable = [
    { name: "id", prop:  "id"},
    { name: "Status", prop: "status.descricao" },
    { name: "Código", prop: "codigo" },
    { name: "Descrição", prop: "descricao" }
  ]

  constructor(private bancosService: BancosService, private router: Router, private _authService: AuthService){
    this.usuarioLogado = this._authService.jwt.getValue();
    console.log('USUÁRIO LOGADO: ', this.usuarioLogado)
  }

  ngOnInit(): void {
    console.log(this.validateRole("ROLE_BANCO_DEL"))
    this.listar();
  }

  listar(){
    this.bancosService.getListBancos(this.pagination).subscribe({
      next: (res) => {
        this.bancos = res;
        this.showTable = true;
      },
      error: (err) => {
        console.log('Err: ', err)
      }
    })
  }

  pageNav(event) {
    this.pagination.pageNumber = event.page;
    this.pagination.pageSize = event.size;
    this.listar()
  }

  changeQtdItensNav(event) {
    this.pagination.pageSize = event;
    this.pagination.pageNumber = this.bancos.totalElements / this.pagination.pageSize < this.pagination.pageNumber ? this.bancos.totalElements / this.pagination.pageSize : this.pagination.pageNumber;
    this.listar();
  }

  tableFilter(event) {

    if (event.campoTexto) {
      this.pagination.pesquisa = event.campoTexto;
    } else {
      this.pagination.pesquisa = "";
    }

    this.pagination.pageSize = event.size;
    this.listar();
  }

  limparFiltro(event){
    this.pagination.pageSize = 10;
    this.pagination.pageNumber = 0;
    this.pagination.pesquisa = "";
    this.listar();
  }

  goTo(rota: string){
    this.router.navigate([rota])
  }
  
  delete(event){
    this.bancosService.deleteBancoById(event.id).subscribe({
      next: (res) => {
        alert("Banco excluído com sucesso");
        this.listar()
      },
      error: (err) => {
        alert("Erro ao deletar banco, tente novamente em instantes.")
      }
    })
  }

  edit(event){
    console.log(event);
    this.router.navigate([`${this.routerEnum.EDITAR_REGISTRO}/${event.id}`])
  }

  validateRole(role: string): boolean {
    return this.usuarioLogado.authorities.includes(role);
  }

}
