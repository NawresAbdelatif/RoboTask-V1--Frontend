import {Component, OnInit, ViewChild} from '@angular/core';
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatButton} from "@angular/material/button";
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {AppLoaderService} from "../../../../shared/services/app-loader/app-loader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {JwtResponse} from "../../Models/jwt-response.model";
import {JwtAuthService} from "../../Services/jwt-auth-service.service";

@Component({
  selector: 'app-user',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;

  signinForm: UntypedFormGroup;
  errorMsg = '';
  hidePassword = true;
  loading = false;
  private _unsubscribeAll: Subject<any>;

  constructor(
      private jwtAuth: JwtAuthService,
      private matxLoader: AppLoaderService,
      private router: Router,
      private route: ActivatedRoute
  ) {
    // this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.signinForm = new UntypedFormGroup({
      email: new UntypedFormControl('', Validators.required),
      password: new UntypedFormControl('', Validators.required),
      rememberMe: new UntypedFormControl(true)
    });


    // this.route.queryParams
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(params => this.return = params['return'] || '/');
  }

  ngAfterViewInit() {
    // this.autoSignIn();
  }

  ngOnDestroy() {
    // this._unsubscribeAll.next(1);
    // this._unsubscribeAll.complete();
  }

  // signin() {
  //   const signinData = this.signinForm.value;
  //   this.submitButton.disabled = true;
  //   this.progressBar.mode = 'indeterminate';
  //
  //   this.jwtAuth.signin(signinData.username, signinData.password)
  //       .subscribe({
  //         next: response => {
  //           localStorage.setItem('token', response.token);
  //           localStorage.setItem('user', JSON.stringify({
  //             username: response.username,
  //             roles: response.roles
  //           }));
  //           this.router.navigateByUrl('dashboard/analytics');
  //         },
  //         error: err => {
  //           this.submitButton.disabled = false;
  //           this.progressBar.mode = 'determinate';
  //           this.errorMsg = err.error?.message || 'Identifiants invalides';
  //         }
  //
  //       });
  //
  // }


  signin() {
    const signinData = this.signinForm.value;
    this.loading = true;
    this.errorMsg = '';

    this.jwtAuth.signin(signinData.email, signinData.password)
        .subscribe({
          next: response => {
            this.router.navigateByUrl('dashboard/analytics');
            this.loading = false;
          },
          error: err => {
            this.loading = false;
            this.errorMsg = err.error?.message || 'Identifiants invalides';
          }
        });
  }


  // autoSignIn() {
  //   if(this.jwtAuth.return === '/') {
  //     return
  //   }
  //   this.matxLoader.open(`Automatically Signing you in! \n Return url: ${this.jwtAuth.return.substring(0, 20)}...`, {width: '320px'});
  //   setTimeout(() => {
  //     this.signin();
  //     console.log('autoSignIn');
  //     this.matxLoader.close()
  //   }, 2000);
  // }

}
