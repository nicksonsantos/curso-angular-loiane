import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
})
export class CursosComponent implements OnInit {
  cursos: any[] = [];
  pagina: number = 1;
  inscricao: Subscription = Subscription.EMPTY;

  constructor(
    private _cursosService: CursosService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.cursos = this._cursosService.getCursos();
    this.inscricao = this._route.queryParams.subscribe(
      (queryParams: any) => (this.pagina = queryParams['pagina'])
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  proximaPagina() {
    this.pagina++;
    this._router.navigate(['/cursos'],
      {queryParams: {'pagina': this.pagina}
    });
  }
}
