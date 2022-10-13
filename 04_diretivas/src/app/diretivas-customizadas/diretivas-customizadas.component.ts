import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.css']
})
export class DiretivasCustomizadasComponent implements OnInit {

  isMouseOver: boolean = false;

  corSelecionada: string = '';

  mostrarCursos: boolean = false;

  cursos: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onMouseEnterOrLeave(){
    this.isMouseOver = !this.isMouseOver;
  }

  mudaCor(evento: any){
    this.corSelecionada = evento.target.value;
  }

  onMostrarCursos(){
    this.mostrarCursos = !this.mostrarCursos;
  }

}
