import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  pessoa: any = {
    nome: 'nickson',
    idade: 24
  };

  constructor() { }

  ngOnInit(): void {
  }

}
