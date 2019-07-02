import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RankingComponent} from './ranking.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '', component: RankingComponent,
  }
];

@NgModule({
  declarations: [RankingComponent],
  imports: [
      SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class RankingModule { }
