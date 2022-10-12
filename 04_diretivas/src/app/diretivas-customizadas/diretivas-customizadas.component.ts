import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretivas-customizadas',
  templateUrl: './diretivas-customizadas.component.html',
  styleUrls: ['./diretivas-customizadas.component.css']
})
export class DiretivasCustomizadasComponent implements OnInit {

  isMouseOver: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseEnterOrLeave(){
    this.isMouseOver = !this.isMouseOver;
  }

}
