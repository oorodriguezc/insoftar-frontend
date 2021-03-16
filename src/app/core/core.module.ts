import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { BackButtonComponent } from './components/back-button/back-button.component';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [BackButtonComponent],
  exports: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ]
})
export class CoreModule {
}
