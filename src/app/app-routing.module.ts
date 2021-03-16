import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', loadChildren: () => import(`./pages/pages.module`).then(m => m.PagesModule)},
    ]
  },
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: '**', redirectTo: 'inicio'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
