import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RewardsComponent} from './rewards.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { DragScrollModule } from 'ngx-drag-scroll';

const routes: Routes = [
  {
    path: '',
    component: RewardsComponent
  }
];
@NgModule({
  declarations: [RewardsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class RewardsModule { }

