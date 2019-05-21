import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderNavComponent} from './header-nav.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    HeaderNavComponent
  ]
})
export class HeaderNavModule {
}
