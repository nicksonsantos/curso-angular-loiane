import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor() { }

  getCursos(){
    return [
      { id: 1, nome: "Angular"},
      { id: 2, nome: ".NET"},
      { id: 3, nome: "Python"}
    ];
  }
}
