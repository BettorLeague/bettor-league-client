import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MatchService } from './services/match.service';
import { MinNumberDigit } from './minNumberDigits.pipe';

const routes: Routes = [
  {
    path: '', component: MatchComponent,
    resolve: {
      app: MatchService
    }
  }
];

@NgModule({
  declarations: [MatchComponent, MinNumberDigit],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    MatchService
  ]

})
export class MatchModule {
}
