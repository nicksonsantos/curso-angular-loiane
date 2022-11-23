import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup('');

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit(): void;

  onSubmit() {
    console.log(this.formulario);
    if (this.formulario.valid) {
      this.submit();
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle)
      }
      if (controle?.invalid) {
        controle.markAsDirty();
        controle.markAsTouched();
      }
    })
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': this.formulario.get(campo)?.valid && this.formulario.get(campo)?.touched,
    };
  }

  verificaValidTouched(campo: string): boolean {
    let validacao = this.formulario.get(campo)?.invalid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);

    if (typeof(validacao) == 'boolean') {
      return validacao;
    }

    return false;
  }

  verificaRequired(campo: string) {
    return (
      this.formulario.get(campo)?.hasError('required') &&
      (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty)
    );
  }

  verificaEmailInvalido() {
    let campoEmail = this.formulario?.get('email');

    if (campoEmail?.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  }

  resetar() {
    this.formulario.reset();
  }

  getFieldFormGroup(formGroupName: string): FormGroup {
    return this.formulario.get(formGroupName) as FormGroup;
  }

}
