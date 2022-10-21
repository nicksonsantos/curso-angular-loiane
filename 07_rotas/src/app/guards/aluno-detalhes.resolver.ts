import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Aluno } from '../alunos/aluno';
import { AlunosService } from '../alunos/alunos.service';

@Injectable({
  providedIn: 'root'
})
export class AlunoDetalhesResolver implements Resolve<Aluno> {

  constructor(private alunoService: AlunosService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    let id = route.params['id'];

    return of(this.alunoService.getAluno(id));
  }
}
