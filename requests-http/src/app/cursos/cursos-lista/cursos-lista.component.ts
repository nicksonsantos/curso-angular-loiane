import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, Subject } from 'rxjs';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from '../cursos.service';
import { AlertModalComponent } from '../../shared/alert-modal/alert-modal.component';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  bsModalRef?: BsModalRef;

  // cursos: Curso[] = [];
  error$ = new Subject<boolean>();
  cursos$: Observable<Curso[]> = EMPTY;


  constructor(private cursosService: CursosService, private modalService: BsModalService) { }

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
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';
  }

}
