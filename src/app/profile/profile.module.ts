import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {SharedModule} from '../shared/shared.module';
import {DrawerComponent} from './components/drawer/drawer.component';
import {BackgroundComponent} from './components/background/background.component';
import {ProfileService} from './services/profile.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/profile/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
      },
      {
        path: 'favorites',
        loadChildren: './modules/favorites/favorites.module#FavoritesModule',
      },
      {
        path: 'messages',
        loadChildren: './modules/messages/messages.module#MessagesModule',
      },
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule',
      },
      {
        path: 'contests',
        loadChildren: './modules/contests/contests.module#ContestsModule',
      },
      {
        path: 'teams',
        loadChildren: './modules/teams/teams.module#TeamsModule',
      }
    ]
  },
];

@NgModule({
  declarations: [
    ProfileComponent,
    DrawerComponent,
    BackgroundComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ProfileService
  ]
})
export class ProfileModule {
}
