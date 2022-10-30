import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

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

  @ViewChild('cep') cep: ElementRef = {} as ElementRef;
  @ViewChild('numero') numero: ElementRef = {} as ElementRef;
  @ViewChild('complemento') complemento: ElementRef = {} as ElementRef;
  @ViewChild('rua') rua: ElementRef = {} as ElementRef;
  @ViewChild('bairro') bairro: ElementRef = {} as ElementRef;
  @ViewChild('cidade') cidade: ElementRef = {} as ElementRef;
  @ViewChild('estado') estado: ElementRef = {} as ElementRef;
  // @ViewChildren(NgModel) modelRefList

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(form: any) {
    console.log(form);

    console.log(this.usuario);
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
