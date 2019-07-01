import {MaterialModule} from './component/material/material.module';
import {NgModule} from '@angular/core';
import {IfOnDomDirective} from './directive/if-on-dom.directive';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import {SnackBarService} from './service/snack-bar.service';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import { LoaderComponent } from './component/loader/loader.component';
import { UpcomingCardComponent } from './component/cards/upcoming-card/upcoming-card.component';
import { BlasonComponent } from './component/blason/blason.component';
import { PastCardComponent } from './component/cards/past-card/past-card.component';
import { LivelyCardComponent } from './component/cards/lively-card/lively-card.component';
import {RouterModule} from '@angular/router';
import {FilterPipe} from './pipe/filter.pipe';
import { CountDownComponent } from './component/count-down/count-down.component';

@NgModule({
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    IfOnDomDirective,
    SnackBarComponent,
    LoaderComponent,
    UpcomingCardComponent,
    BlasonComponent,
    PastCardComponent,
    LivelyCardComponent,
    FilterPipe,
    CountDownComponent
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    IfOnDomDirective,
    FormsModule,
    ReactiveFormsModule,
    SnackBarComponent,
    LoaderComponent,
    UpcomingCardComponent,
    PastCardComponent,
    LivelyCardComponent,
    BlasonComponent,
    CountDownComponent,
    FilterPipe
  ],
  providers: [
    SnackBarService
  ],
  entryComponents: [
    SnackBarComponent
  ]
})
export class SharedModule { }
