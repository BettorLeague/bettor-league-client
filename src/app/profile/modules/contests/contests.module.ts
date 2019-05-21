import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContestsComponent} from './contests.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ContestsComponent
  }
];

@NgModule({
  declarations: [ContestsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContestsModule { }
