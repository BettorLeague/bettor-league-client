import {BrowserModule} from '@angular/platform-browser';
import {APP_BOOTSTRAP_LISTENER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './authentication/services/token.interceptor';
import {AuthenticationService} from './authentication/services/authentication.service';
import {TokenStorage} from './authentication/services/token.storage';
import {HeaderNavModule} from './header-nav/header-nav.module';
import {ProfileBarModule} from './profile-bar/profile-bar.module';
import {SharedModule} from './shared/shared.module';
import { ContestDialogModule } from './contest-dialog/contest-dialog.module';

export function init_app(authService: AuthenticationService, tokenStorage: TokenStorage) {
  return () => tokenStorage.getToken() ? authService.initUser().catch(tokenStorage.removeToken) : null;
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    ProfileBarModule,
    HeaderNavModule,
    AppRoutingModule,
    ContestDialogModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: init_app,
      deps: [AuthenticationService, TokenStorage],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
