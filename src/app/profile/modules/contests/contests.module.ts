import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContestsComponent} from './contests.component';
import {RouterModule, Routes} from '@angular/router';
import { ContestCardComponent } from '../../../shared/component/cards/contest-card/contest-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrivateContestsComponent } from './components/private-contests/private-contests.component';
import { PublicContestsComponent } from './components/public-contests/public-contests.component';

const routes: Routes = [
  {
    path: '',
    component: ContestsComponent
  }
];

@NgModule({
  declarations: [
    ContestsComponent,
    ContestCardComponent,
    PrivateContestsComponent,
    PublicContestsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ContestsModule { }
