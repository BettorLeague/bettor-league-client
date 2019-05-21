import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContestComponent} from './contest.component';
import {ContestService} from './services/contest.service';
import {BackgroundComponent} from './components/background/background.component';
import {ProfileBarModule} from '../profile-bar/profile-bar.module';
import {NavigationComponent} from './components/navigation/navigation.component';
import { MinRankingComponent } from './components/mini-ranking/min-ranking.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContestComponent,
    resolve: {
      app: ContestService
    },
    children: [
      {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule',
      },
      {
        path: 'match/:id',
        loadChildren: './modules/match/match.module#MatchModule',
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
  ],
  providers: [
    ContestService
  ]
})
export class ContestModule {
}
