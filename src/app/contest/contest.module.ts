import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContestComponent} from './contest.component';
import {ContestService} from './services/contest.service';
import {BackgroundComponent} from './components/background/background.component';
import {ProfileBarModule} from '../profile-bar/profile-bar.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import {MinRankingComponent} from './components/mini-ranking/min-ranking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'matches',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContestComponent,
    resolve: {
      parent: ContestService
    },
    children: [
      {
        path: 'matches',
        loadChildren: './modules/matches/matches.module#MatchesModule',
      },
      {
        path: 'chat',
        loadChildren: './modules/chat/chat.module#ChatModule',
      },
      {
        path: 'ranking',
        loadChildren: './modules/ranking/ranking.module#RankingModule',
      }
    ]
  }

];

@NgModule({
  declarations: [ContestComponent, BackgroundComponent, NavigationComponent, MinRankingComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileBarModule,
    RouterModule.forChild(routes)
  ]
})
export class ContestModule {
}
