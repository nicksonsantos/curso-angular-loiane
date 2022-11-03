import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TemplateFormService {

  constructor(private http: HttpClient) { }

  pesquisaCEP(evento: any, form: any) {

    let cep = evento.target.value;

    cep = cep.replace(/\D/g, '');

    if (cep != '') {
      //Expressão regular para validar o CEP.
      let validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {

        this.http
          .get('https://viacep.com.br/ws/' + cep + '/json/')
          .subscribe((dados) => this.populaDadosForm(dados, form));

      }
      else {
        //cep é inválido.
        this.limpaFormularioCep(form);
        alert('Formato de CEP inválido.');
      }
    }
    else {
      //cep sem valor, limpa formulário.
      this.limpaFormularioCep(form);
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    // formulario.setValue({
    //   nome: formulario.value.nome,
    //   email: formulario.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     estado: dados.uf,
    //   },
    // });

    formulario.form.patchValue({
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
    formulario.form.patchValue({
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
