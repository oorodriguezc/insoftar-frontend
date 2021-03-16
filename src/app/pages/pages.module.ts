import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UsersComponent } from './users/users.component';
import { FrontendLayoutComponent } from './layout/frontend-layout/frontend-layout.component';
import { FrontendFooterComponent } from './layout/frontend-footer/frontend-footer.component';
import { FrontendTopNavComponent } from './layout/frontend-top-nav/frontend-top-nav.component';


@NgModule({
  declarations: [UsersComponent, FrontendLayoutComponent, FrontendFooterComponent, FrontendTopNavComponent],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
