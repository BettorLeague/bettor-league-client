import {Component, OnInit} from '@angular/core';
import {SplashScreenService} from './shared/service/splash-screen.service';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {AuthenticationService} from './authentication/services/authentication.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {ProfileService} from './profile/services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  public loading: boolean;
  public showHeader: boolean;
  public showProfileBar: boolean;

  constructor(private splashScreenService: SplashScreenService,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              private activatedRoute: ActivatedRoute,
              private profileService: ProfileService,
              public authService: AuthenticationService,
              private router: Router) {
    this.showHeader = true;
    this.showHeader = true;
    this.loading = false;

    this.matIconRegistry.addSvgIcon(
      'logo-google',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/google-icon.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      'logo-facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/facebook-icon.svg`)
    );

    this.matIconRegistry.addSvgIcon(
      'logo-github',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`../assets/github-icon.svg`)
    );
  }

  ngOnInit() {
    this.authService.currentUser.subscribe(res => {
      if (res) {
        this.profileService.getPronostics();
      }
    });
    this.router.events.subscribe((event: any) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          if (this.activatedRoute.root.firstChild) {
            this.activatedRoute.root.firstChild.data.subscribe(res => {
              if (res && res.fullscreen) {
                this.showHeader = false;
                this.showProfileBar = false;
              } else {
                this.showHeader = true;
                this.showProfileBar = true;
              }
            });
          }
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }


}
