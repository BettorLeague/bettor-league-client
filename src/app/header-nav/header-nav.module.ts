import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderNavComponent} from './header-nav.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderNavComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    HeaderNavComponent
  ]
})
export class HeaderNavModule {
}
