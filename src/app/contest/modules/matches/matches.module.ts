import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchesComponent} from './matches.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import {DragScrollModule} from 'ngx-drag-scroll';

const routes: Routes = [
  {
    path: '',
    component: MatchesComponent,
  },
  {
    path: ':id',
    loadChildren: './modules/match/match.module#MatchModule',
  }
];

@NgModule({
  declarations: [MatchesComponent],
  imports: [
    CommonModule,
    SharedModule,
    DragScrollModule,
    RouterModule.forChild(routes)
  ]
})
export class MatchesModule { }
