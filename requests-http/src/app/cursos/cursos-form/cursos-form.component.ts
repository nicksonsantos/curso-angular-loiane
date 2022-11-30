import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, ValidationErrors } from '@angular/forms';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';


@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  form: FormGroup = new FormGroup('');
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private modal: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     const curso$ = this.cursosService.getCurso(id);
    //     curso$.subscribe(curso => {
    //       this.updateForm(curso);
    //     });
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.cursosService.getCurso(id))
    //     // switchMap9cursos => obterAulas)
    //   )
    //   .subscribe(curso => this.updateForm(curso));
    // não é necessário fazer unsubscribe automaticamente

    // concatMap -> ordem da requisição importa
    // mergeMap -> ordem não importa
    // exhaustMap -> casos de login

    // utilizando o resolver toda a lógica acima fica no curso-resolver.guard e só é necessário o código abaixo
    const curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [curso.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    });
  }

  // updateForm(curso: any) {
  //   this.form.patchValue({
  //     id: curso.id,
  //     nome: curso.nome
  //   })
  // }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);

    if (this.form.valid) {

      let mensagemSuccess = 'Curso criado com sucesso!';
      let mensagemError = 'Erro ao criar curso, tente novamente!'
      if (this.form.value.id) {
        mensagemSuccess = 'Curso atualizado com sucesso!';
        mensagemError = 'Erro ao atualizar curso, tente novamente!';
      }

      this.cursosService.save(this.form.value).subscribe({
        next: (v) => {
          this.modal.showAlertSuccess(mensagemSuccess);
          this.location.back();
        },
        error: (e) => this.modal.showAlertDanger(mensagemError)
      });

    } else {
      console.log('Formulário inválido.');
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset;
    console.log('cancel')
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

}
