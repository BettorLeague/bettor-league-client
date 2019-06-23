import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchComponent} from './match.component';
import {RouterModule, Routes} from '@angular/router';
import {MatchService} from './services/match.service';

const routes: Routes = [
  {
    path: '', component: MatchComponent,
    resolve: {
      app: MatchService
    }
  }
];

@NgModule({
  declarations: [MatchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MatchService
  ]

})
export class MatchModule {
}
