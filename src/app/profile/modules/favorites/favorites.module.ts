import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FavoritesComponent} from './favorites.component';
import {PastComponent} from './components/past/past.component';
import {UpcomingComponent} from './components/upcoming/upcoming.component';
import {LivelyComponent} from './components/lively/lively.component';
import {SharedModule} from '../../../shared/shared.module';
import {MyPronosticsService} from './services/my-pronostics.service';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
    resolve: {
      app : MyPronosticsService
    }
  }
];

@NgModule({
  declarations: [
    FavoritesComponent,
    PastComponent,
    UpcomingComponent,
    LivelyComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MyPronosticsService
  ]
})
export class FavoritesModule {
}
