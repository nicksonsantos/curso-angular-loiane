import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  cursos: Curso[] = [];

  readonly cursos$: Observable<Curso[]> = this.cursosService.getCursos();;

  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    // this.cursosService.getCursos().subscribe((cursos: Curso[]) => this.cursos = cursos);

  }

}
