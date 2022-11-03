import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataFormService } from './data-form.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup('');

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private formsService: DataFormService) { }

  ngOnInit(): void {
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null),

    //   endereco: new FormGroup({
    //     cep: new FormControl(null)
    //   })
    // });

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        rua: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
      })

    });
  }

  onSubmit() {



    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form
        this.resetar();
      }, (error: any) => alert('erro'));
  }

  resetar() {
    this.formulario.reset();
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched,
    };
  }

  verificaValidTouched(campo: string): boolean {
    let validacao = this.formulario.get(campo)?.invalid && this.formulario.get(campo)?.touched;

    if (typeof(validacao) == 'boolean') {
      return validacao;
    }

    return false;
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario?.get('email');

    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  pesquisaCEP() {
    this.formsService.consultaCEP(this.formulario);
  }

}
