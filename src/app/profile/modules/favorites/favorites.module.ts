import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FavoritesComponent} from './favorites.component';
import {PastComponent} from './components/past/past.component';
import {UpcomingComponent} from './components/upcoming/upcoming.component';
import {LivelyComponent} from './components/lively/lively.component';
import {SharedModule} from '../../../shared/shared.module';
import {FlexLayoutModule} from '@angular/flex-layout';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent
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
  ]
})
export class FavoritesModule {
}
