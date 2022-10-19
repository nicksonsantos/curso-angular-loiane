import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CursoNaoEncontradoComponent } from './curso-nao-encontrado/curso-nao-encontrado.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursosComponent } from './cursos.component';


const cursosRoutes = [
  { path: '', component: CursosComponent },
  { path: 'naoEncontrado', component: CursoNaoEncontradoComponent},
  { path: ':id', component: CursoDetalheComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cursosRoutes)],
   exports: [RouterModule]
})
export class CursosRoutingModule { }
