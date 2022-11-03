import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TemplateFormService } from './template-form.service';

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
    private formsService: TemplateFormService) {}

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

  pesquisaCEP(evento: any, form: any) {
    this.formsService.pesquisaCEP(evento, form);
  }

}
