import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DataFormService {

  constructor(private http: HttpClient) { }

  consultaCEP(formulario: FormGroup) {
    let cep = formulario.get('endereco.cep')?.value;

    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.http
          .get('https://viacep.com.br/ws/' + cep + '/json/')
          .subscribe((dados) => this.populaDadosForm(dados, formulario));

      }
      else {
        //cep é inválido.
        this.limpaFormularioCep(formulario);
        alert('Formato de CEP inválido.');
      }
    }
    else {
      //cep sem valor, limpa formulário.
      this.limpaFormularioCep(formulario);
    }
  }


  populaDadosForm(dados: any, formulario: any) {

    formulario.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      }
    });
  }

  limpaFormularioCep(formulario: any) {
    formulario.patchValue({
      endereco: {
        cep: '',
        numero: '',
        complemento: '',
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
      }
    });
  }

}
