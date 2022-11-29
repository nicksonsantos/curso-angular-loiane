import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CursosService } from '../../../../../05_servicos/src/app/cursos/cursos.service';

@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss']
})
export class CursosFormComponent implements OnInit {

  formulario: FormGroup = new FormGroup('');

  constructor(private formBuilder: FormBuilder, private cursosService: CursosService) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.formulario.controls);
    if (this.formulario.valid) {
      // let nomeCurso = this.formulario.controls;
      // this.cursosService.addCurso()
    } else {
      console.log('Formulário inválido.')
    }
  }

}
