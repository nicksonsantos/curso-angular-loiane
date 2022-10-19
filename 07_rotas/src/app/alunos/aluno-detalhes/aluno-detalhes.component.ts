import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlunosService } from '../alunos.service';

@Component({
  selector: 'app-aluno-detalhes',
  templateUrl: './aluno-detalhes.component.html',
  styleUrls: ['./aluno-detalhes.component.css']
})
export class AlunoDetalhesComponent implements OnInit, OnDestroy {

  inscricao: Subscription = Subscription.EMPTY;
  aluno: any;

  editarContato() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

  constructor(
    private route: ActivatedRoute,
    private alunosService: AlunosService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this.alunosService.getAluno(id);

        if (this.aluno === null) {
          this.aluno = {};
        }
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
