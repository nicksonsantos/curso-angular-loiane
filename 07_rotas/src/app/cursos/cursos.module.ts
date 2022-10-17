import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosService } from './cursos.service';
import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { AppRoutingModule } from '../app-routing.module';




@NgModule({
  declarations: [
    CursosComponent,
    CursoDetalheComponent,
    CursoNaoEncontradoComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
