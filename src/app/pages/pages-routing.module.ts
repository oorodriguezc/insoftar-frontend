import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontendLayoutComponent} from './layout/frontend-layout/frontend-layout.component';
import {UsersComponent} from './users/users.component';
import {UsersFormComponent} from './users/form/users-form.component';
import {UsersShowComponent} from './users/show/users-show.component';

const routes: Routes = [
  {
    path: '',
    component: FrontendLayoutComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
        pathMatch: 'full'
      },
      {
        path: 'users/form',
        component: UsersFormComponent
      },
      {
        path: 'users/form/:userId',
        component: UsersFormComponent
      },
      {
        path: 'users/show/:userId',
        component: UsersShowComponent
      },
      {path: '', redirectTo: '/', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
