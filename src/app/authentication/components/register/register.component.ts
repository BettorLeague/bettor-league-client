import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MyAnimations} from "../../../shared/animation";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/internal/operators";
import {SnackBarType} from "../../../shared/model/snack-bar.type";
import {LoginRequestModel} from "../../models/login.request.model";
import {environment} from "../../../../environments/environment";
import {AuthenticationService} from "../../services/authentication.service";
import {SnackBarService} from "../../../shared/service/snack-bar.service";
import {RegisterRequestModel} from "../../models/register.request.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss'],
  animations : MyAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {


  registerForm: FormGroup;
  submitted: boolean;

  private unsubscribeAll: Subject<any>;

  constructor(private formBuilder: FormBuilder,
              private snackBar: SnackBarService,
              private router: Router,
              private authService: AuthenticationService) {
    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.submitted = false;
    this.registerForm = this.formBuilder.group({
      name           : ['', Validators.required],
      email          : ['', [Validators.required, Validators.email]],
      password       : ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
      accept       : ['', Validators.requiredTrue],
    });

    // Update the validity of the 'passwordConfirm' field
    // when the 'password' field changes
    this.registerForm.get('password').valueChanges
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.submitted = null;
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  submit(){
    this.submitted = true;
    let registerRequest= new RegisterRequestModel(this.registerForm.value.name,this.registerForm.value.email.toLowerCase(),this.registerForm.value.password);

    this.authService.attemptSignUp(registerRequest).toPromise()
      .then(res => {
        setTimeout(()=>{
          this.submitted = false;
          this.snackBar.show(SnackBarType.success,"Successful registration of "+this.registerForm.value.name);
          this.router.navigate(['/auth/login'],{ queryParams: { email: registerRequest.email} });
        },1000);

      }).catch(error => {
      setTimeout(()=>{
        this.submitted = false;
        this.snackBar.show(SnackBarType.error,error);
      },1000);

    })
  }


  oauth2(provider:string){
    window.open(environment.backUrl + "/oauth2/authorize/"+provider+'?redirect_uri='+environment.frontUrl+'/auth/login', '_self');
  }

}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {

  if ( !control.parent || !control )
  {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if ( !password || !passwordConfirm )
  {
    return null;
  }

  if ( passwordConfirm.value === '' )
  {
    return null;
  }

  if ( password.value === passwordConfirm.value )
  {
    return null;
  }

  return {'passwordsNotMatching': true};
};
