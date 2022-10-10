import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cursos-detalhe',
  templateUrl: './cursos-detalhe.component.html',
  styleUrls: ['./cursos-detalhe.component.css']
})
export class CursosDetalheComponent implements OnInit {

  @Input('id') idCurso!: number;

  teste(){
    console.log(this.idCurso)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
