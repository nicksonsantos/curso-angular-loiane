import { Component, OnInit } from '@angular/core';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  nomePortal: string;
  cursos: { id: number, nome: string}[];

  constructor(private cursosService: CursosService) {
    this.nomePortal = 'http://loiane.training';

    this.cursos = this.cursosService.getCursos();
   }

  ngOnInit(): void {
  }

}
