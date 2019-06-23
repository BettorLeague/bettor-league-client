import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GuestGuard} from './shared/guard/guest.guard';
import {UserGuard} from './shared/guard/user.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    canActivate: [GuestGuard],
    data : {
      fullscreen : true
    }
  },
  {
    path: 'profile',
    loadChildren: './profile/profile.module#ProfileModule',
    canActivate: [UserGuard],
    data : {
      fullscreen : true
    }
  },
  {
    path: 'team/:id',
    loadChildren: './team/team.module#TeamModule'
  },
  {
    path: 'contest/:id',
    loadChildren: './contest/contest.module#ContestModule'
  },
  {
    path: 'error',
    loadChildren: './error/error.module#ErrorModule',
    data : {
      fullscreen : true
    }
  },
  {
    path: '',
    loadChildren: './home/home.module#HomeModule'
  },
  {
    path: '**',
    redirectTo: 'error/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
