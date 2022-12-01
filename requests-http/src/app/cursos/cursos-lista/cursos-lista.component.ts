import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { catchError, EMPTY, Observable, Subject, switchMap, take } from 'rxjs';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from '../cursos.service';
import { AlertModalService } from '../../shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss']
})
export class CursosListaComponent implements OnInit {
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;
  cursoSelecionado: Curso = {id: 0, nome: ''};

  // cursos: Curso[] = [];
  error$ = new Subject<boolean>();
  cursos$: Observable<Curso[]> = EMPTY;


  constructor(
    private cursosService: Cursos2Service,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    // this.cursosService.getCursos().subscribe((cursos: Curso[]) => this.cursos = cursos);
    this.onRefresh();
  }

  onRefresh() {
    this.error$.next(false);
    this.cursos$ = this.cursosService.list()
    .pipe(
      catchError(error => {
        this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos. Tente novamente mais tarde.';

    this.alertModalService.showAlertDanger('Erro ao carregar cursos. Tente novamente mais tarde.');
  }

  onEdit(id: number) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});

    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?');

    // result$.subscribe(() => this.onConfirmDelete());

    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.cursosService.delete(this.cursoSelecionado.id) : EMPTY)
      )
      .subscribe({
        next: (v) => this.onRefresh(),
        error: (e) => this.alertModalService.showAlertDanger('Erro ao remover curso, tente novamente mais tarde.')
      });
  }

  onConfirmDelete(): void {
    this.cursosService.delete(this.cursoSelecionado.id)
      .subscribe({
        next: (v) => this.onRefresh(),
        error: (e) => this.alertModalService.showAlertDanger('Erro ao remover curso, tente novamente mais tarde.')
      });
    this.deleteModalRef?.hide();
  }

  onDeclineDelete(): void {
    this.deleteModalRef?.hide();
  }

}
