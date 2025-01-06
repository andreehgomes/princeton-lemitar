import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BancosService } from '../../services/bancos.service';
import { BancosPayload } from '../../interfaces/bancos-payload';
import { Route, Router } from '@angular/router';
import { RouterEnum } from '../../const/router-enum';

@Component({
  selector: 'app-novo-registro',
  standalone: false,
  templateUrl: './novo-registro.component.html',
  styleUrl: './novo-registro.component.scss'
})
export class NovoRegistroComponent {

  readonly routerEnum = RouterEnum;

  formGroupBanco = new FormGroup({
    formControlCodigo: new FormControl("", [Validators.required]),
    formControlDescricao: new FormControl("", [Validators.required]),
    formControlStatus: new FormControl<string>("A", [Validators.required])
  })

  constructor(private _bancoService: BancosService, private router: Router){}

  onSubmit(){
    const { formControlCodigo, formControlDescricao, formControlStatus } = this.formGroupBanco.controls;
    let payload: BancosPayload = {
      descricao: formControlDescricao.value,
      status: {
        id: formControlStatus.value,
      },
      codigo: formControlCodigo.value
    }

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
  }

}
