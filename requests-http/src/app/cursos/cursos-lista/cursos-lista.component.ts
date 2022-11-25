import { Component, OnInit } from '@angular/core';
import { catchError, EMPTY, empty, Observable, Subject } from 'rxjs';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {

  // cursos: Curso[] = [];
  error$ = new Subject<boolean>();
  cursos$: Observable<Curso[]> = EMPTY;


  constructor(private cursosService: CursosService) { }

  ngOnInit(): void {
    // this.cursosService.getCursos().subscribe((cursos: Curso[]) => this.cursos = cursos);
    this.onRefresh();
  }

  onRefresh() {
    this.error$.next(false);
    this.cursos$ = this.cursosService.getCursos()
    .pipe(
      catchError(error => {
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

}
