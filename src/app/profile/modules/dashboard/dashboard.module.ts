import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    ChartsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
