import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileBarComponent} from './profile-bar.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ProfileBarService} from './services/profile-bar.service';

@NgModule({
  declarations: [ProfileBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    ProfileBarComponent
  ],
  providers: [
    ProfileBarService
  ]
})
export class ProfileBarModule {
}
