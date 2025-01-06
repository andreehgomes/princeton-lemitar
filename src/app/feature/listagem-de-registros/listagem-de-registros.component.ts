import { Component, OnInit } from '@angular/core';
import { BancosService } from '../../services/bancos.service';
import { Pagination } from '../../interfaces/pagination';

@Component({
  selector: 'app-listagem-de-registros',
  standalone: false,
  templateUrl: './listagem-de-registros.component.html',
  styleUrl: './listagem-de-registros.component.scss'
})
export class ListagemDeRegistrosComponent implements OnInit {

  pagination: Pagination = {
    pageNumber: 0,
    pageSize: 10
  }

  constructor(private bancosService: BancosService){}

  ngOnInit(): void {
    this.bancosService.getListBancos(this.pagination).subscribe({
      next: (res) => {
        console.log('Bancos: ', res);
      },
      error: (err) => {
        console.log('Err: ', err)
      }
    })
  }
}
