import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { EstadoBr } from '../shared/models/estado-br';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';
import { DropdownService } from '../shared/services/dropdown.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup('');
  // estados: EstadoBr[] = [];
  estados: Observable<EstadoBr[]> = new Observable<EstadoBr[]>();
  cargos: any[] = [];
  tecnologias: any[] = [];
  newsletterOp: any[] = [];
  frameworks = ['Angular', 'React', 'Vue', 'Sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private cepService: ConsultaCepService,
    private dropdownService: DropdownService) { }

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
        estado: [null, [Validators.required]],
      }),

      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.requiredTrue],
      frameworks: this.buildFrameworks()

    });

    // this.dropdownService.getEstadosBr().subscribe((dados) => this.estados = dados);

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();
  }

  buildFrameworks() {
    const values = this.frameworks.map(v => new FormControl(false));
    return this.formBuilder.array(values);
  }

  onSubmit() {

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
        console.log(dados);
        // reseta o form
        this.resetar();
      }, (error: any) => alert('erro'));
    } else {
      console.log('formulario invalido');
      this.verificaValidacoesForm(this.formulario);
    }


  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle)
      }
      if (controle?.invalid) {
        controle.markAsDirty();
      }
    })
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
    let validacao = this.formulario.get(campo)?.invalid && (this.formulario.get(campo)?.touched || this.formulario.get(campo)?.dirty);

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

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep)
      .subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados: any) {

    this.formulario.patchValue({
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

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['java', 'javascript', 'php']);
  }


}
