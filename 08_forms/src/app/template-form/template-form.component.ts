import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css'],
})
export class TemplateFormComponent implements OnInit {
  usuario: any = {
    nome: 'Nickson',
    email: 'nicksonemail@email.com',
  };

  constructor(
    private http: HttpClient,
    private cepService: ConsultaCepService) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form);

    this.http.post('https://httpbin.org/post', JSON.stringify(form.value))
      .subscribe(dados => {
        console.log(dados);
        form.form.reset();
      });
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': campo.valid,
    };
  }

  consultaCEP(evento: any, form: any) {
    let cep = evento.target.value;
    // Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados: any, formulario: any) {
    /*formulario.setValue({
      nome: formulario.value.nome,
      email: formulario.value.email,
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        numero: '',
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });*/

    formulario.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        // cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });

    // console.log(form);
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

}
