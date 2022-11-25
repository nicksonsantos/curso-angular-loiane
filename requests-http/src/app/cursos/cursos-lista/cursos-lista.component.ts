import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos: Curso[] = [];

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    this.cursosService.getCursos().subscribe((cursos: Curso[]) => this.cursos = cursos);
  }

}
