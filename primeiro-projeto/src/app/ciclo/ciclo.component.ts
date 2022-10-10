import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ciclo',
  templateUrl: './ciclo.component.html',
  styleUrls: ['./ciclo.component.css']
})
export class CicloComponent implements OnInit {

  @Input() valorInicial: number = 0;

  deletarCiclo:boolean = false;

  mudarValor() {
    this.valorInicial++;
  }

  destruirCiclo(){
    this.deletarCiclo = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
