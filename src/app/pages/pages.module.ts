import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {UsersComponent} from './users/users.component';
import {FrontendLayoutComponent} from './layout/frontend-layout/frontend-layout.component';
import {FrontendFooterComponent} from './layout/frontend-footer/frontend-footer.component';
import {FrontendTopNavComponent} from './layout/frontend-top-nav/frontend-top-nav.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {UsersShowComponent} from './users/show/users-show.component';
import {UsersFormComponent} from './users/form/users-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from '../core/core.module';


@NgModule({
  declarations: [
    UsersComponent,
    FrontendLayoutComponent,
    FrontendFooterComponent,
    FrontendTopNavComponent,
    UsersFormComponent,
    UsersShowComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class PagesModule {
}
