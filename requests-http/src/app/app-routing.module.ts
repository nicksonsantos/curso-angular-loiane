import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: 'cursos',
    loadChildren: () =>
      import('src/app/cursos/cursos.module').then((m) => m.CursosModule),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('src/app/upload-file/upload-file.module').then((m) => m.UploadFileModule)
  },
  {
    path: 'search',
    loadChildren: () =>
      import('src/app/reactive-search/reactive-search.module').then((m) => m.ReactiveSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
