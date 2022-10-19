import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'alunos', loadChildren: () => import('src/app/alunos/alunos.module').then(m => m.AlunosModule) },
  { path: 'cursos', loadChildren: () => import('src/app/cursos/cursos.module').then(m => m.CursosModule) },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
