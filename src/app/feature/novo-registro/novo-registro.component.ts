import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BancosService } from '../../services/bancos.service';
import { BancosPayload } from '../../interfaces/bancos-payload';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RouterEnum } from '../../const/router-enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-novo-registro',
  standalone: false,
  templateUrl: './novo-registro.component.html',
  styleUrl: './novo-registro.component.scss'
})
export class NovoRegistroComponent implements OnInit {
  idEditBanco: number;
  flagEditBanco: boolean = false;
  bancoEdit: BancosPayload;
  readonly routerEnum = RouterEnum;

  formGroupBanco = new FormGroup({
    formControlCodigo: new FormControl("", [Validators.required]),
    formControlDescricao: new FormControl("", [Validators.required]),
    formControlStatus: new FormControl<string>("A", [Validators.required])
  })

  constructor(
    private _bancoService: BancosService,
    private router: Router,
    private activatedRoute: ActivatedRoute  
  ){
    if(this.activatedRoute.snapshot.paramMap.get("id")){
      this.idEditBanco = Number(this.activatedRoute.snapshot.paramMap.get("id") ? this.activatedRoute.snapshot.paramMap.get("id") : null);
      this.flagEditBanco = true;
    }
  }

  ngOnInit(): void {
    if(this.flagEditBanco){
      this.buildFormBancoEdit(this.idEditBanco);
    }
  }

  onSubmit(){
    const { formControlCodigo, formControlDescricao, formControlStatus } = this.formGroupBanco.controls;
    let payload: BancosPayload = {
      descricao: formControlDescricao.value,
      status: {
        id: formControlStatus.value,
      },
      codigo: formControlCodigo.value,
      id: this.flagEditBanco ? this.bancoEdit.id : null
    }

    if(!this.flagEditBanco){
      this._bancoService.postNovoBanco(payload).subscribe({
        next: (res) => {
          alert("Banco cadastrado com sucesso!!!!")
          this.router.navigate([this.routerEnum.LISTAGEM_DE_REGISTROS])
  
        },
        error: (err) => {
          console.log(err)
          alert(`Error: ${err.error[0].mensagemUsuario}`)
        }
      })
    }else{
      this._bancoService.putNovoBanco(payload).subscribe({
        next: (res) => {
          alert("Banco cadastrado com sucesso!!!!")
          this.router.navigate([this.routerEnum.LISTAGEM_DE_REGISTROS])
  
        },
        error: (err) => {
          console.log(err)
          alert(`Error: ${err.error[0].mensagemUsuario}`)
        }
      })
    }
  }

  buildFormBancoEdit(id: number){
    this._bancoService.getBancoById(id).subscribe({
      next: (res) => {
        console.log('banco: ', res);
        this.bancoEdit = res;
        this.buildForm(res);
      },
      error: (err) => {
        alert("Erro na consulta do banco");
      }
    })
  }

  buildForm(banco: BancosPayload){
    this.formGroupBanco.controls['formControlCodigo'].setValue(banco.codigo)
    this.formGroupBanco.controls['formControlDescricao'].setValue(banco.descricao)
    this.formGroupBanco.controls['formControlStatus'].setValue(banco.status.id)
  }
}
