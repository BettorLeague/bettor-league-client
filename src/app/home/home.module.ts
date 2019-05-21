import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {HomeService} from './services/home.service';
import {GamesComponent} from './components/games/games.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {AllContestComponent} from './components/all-contest/all-contest.component';
import {AllTeamComponent} from './components/all-team/all-team.component';
import {DragScrollModule} from 'ngx-drag-scroll';
import {BackgroundComponent} from './components/background/background.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve  : {
      app: HomeService
    }
  },
];

@NgModule({
  declarations: [HomeComponent, GamesComponent, NavigationComponent, AllContestComponent, AllTeamComponent, BackgroundComponent],
  imports: [
    CommonModule,
    DragScrollModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    HomeService
  ]
})
export class HomeModule {
}
