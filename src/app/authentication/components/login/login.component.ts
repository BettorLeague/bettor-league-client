import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyAnimations} from '../../../shared/animation';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {AuthenticationService} from '../../services/authentication.service';
import {SnackBarService} from '../../../shared/service/snack-bar.service';
import {SnackBarType} from '../../../shared/model/snack-bar.type';
import {TokenStorage} from '../../services/token.storage';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginRequestModel} from '../../models/login.request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: MyAnimations
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string;
  loginForm: FormGroup;
  submitted: boolean;
  hide = true;

  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackBarService,
              private router: Router,
              private route: ActivatedRoute,
              private tokenStorage: TokenStorage,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.returnUrl = (params['returnUrl'] ? params['returnUrl'] : null);
      params['token'] ? this.login(params['token'], true) : null;
      params['email'] ? this.loginForm.controls['email'].setValue(params['email']) : null;
      params['error'] ? this.snackBar.show(SnackBarType.error, params['error']) : null;
    });

    this.submitted = false;

  }

  ngOnDestroy(): void {
    this.submitted = null;
  }


  submit() {
    this.submitted = true;
    const loginRequest = new LoginRequestModel(this.loginForm.value.email, this.loginForm.value.password);

    this.authService.attemptSignIn(loginRequest).toPromise()
      .then(res => {
        setTimeout(() => {
          this.submitted = false;
          this.login(res.accessToken, this.loginForm.value.remember);
        }, 1000);

      }).catch(error => {
      setTimeout(() => {
        this.submitted = false;
        this.snackBar.show(SnackBarType.error, error);
      }, 1000);

    });
  }


  oauth2(provider: string) {
    window.open(environment.backUrl + '/oauth2/authorize/' + provider + '?redirect_uri=' + environment.frontUrl + '/auth/login' + (this.returnUrl ? '?returnUrl=' + this.returnUrl : ''), '_self');
  }

  login(token: string, remember: boolean) {
    this.tokenStorage.saveToken(token, remember);
    this.authService.initUser().then(res => {
      this.router.navigate([this.returnUrl ? this.returnUrl : 'profile']);
    });
  }


}
