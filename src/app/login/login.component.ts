import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
// import {AlertService} from '../services/alert.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HttpErrorResponse } from '@angular/common/http';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { config, firebaseConfig } from '../config';
import { AlertService } from '../services/alert.service';
import { UserAgentApplication } from 'msal';
import { MsalService } from "@azure/msal-angular";
declare const $: any;

/**
 * Login with yahoo using fireBase 
 */
firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.OAuthProvider('yahoo.com');
provider.setCustomParameters({
  prompt: 'login',
});
declare const FB: any;
declare const Msal: any;


var graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

/**
 * Scope for microsoft login service
 */
const requestObj = {
  scopes: ["user.read"]
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  returnUrl: string;
  FB: any;
  isUserLoggedIn = false;
  isDisable = false;
  eventIdWithLogin = JSON.parse(localStorage.getItem('newEventId'));;
  isGuestJoined;
  isCelebrant;
  userRole;
  isAuthenticated = false;
  profile: any;
  hotmailToken;
  yahooAccesstoken: any;
  yahooId;
  show: boolean;
  pwd: boolean;
  userName;
  isLoad = false;
  msalConfig = {
    auth: {
      clientId: 'bd9b8a24-97aa-42db-a5fe-dcb24b15e6f8', //This is your client ID,
      authority: "https://login.microsoftonline.com/common", //This is your tenant info
    },
    // cache: {
    //   cacheLocation: "localStorage",
    //   storeAuthStateInCookie: true
    // }
  };
  myMSALObj = new Msal.UserAgentApplication(this.msalConfig);

  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService, private authService: AuthService,
    private alertService: AlertService, ) {
    this.show = false;

    // redirect to home if already logged in
    if (this._loginService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });



    /**
     * Login form for user
     */
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    /**
     * Forgot password forn
     */
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    /**
     * AppId of facebook to login with facebook 
     */
    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '350939005533804',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
      });
      FB.AppEvents.logPageView();
    };
    (function (d, s, id) {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=350939005533804&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  /**
   * Login with microsoft or hotmail
   */
  hotMailLogin() {
    console.log("heeeeeeeee rammmmmmm", this.myMSALObj);
    let requestObj = {
      scopes: ["user.read"]
    }
    let obj = this.myMSALObj;
    obj.loginPopup(requestObj).then(function (loginResponse) {
      //Successful login
      //Call MS Graph using the token in the response
      console.log("Login Response", loginResponse);
      obj.acquireTokenSilent(requestObj)
        .then(function (tokenResponse) {
          console.log(tokenResponse.accessToken);
          callmicrosoftLogin(tokenResponse.accessToken)
        }).catch(function (error) {
          console.log(error);
        })
      obj.acquireTokenPopup(requestObj)
        .then(function (tokenResponse) {
          console.log(tokenResponse.accessToken)
        }).catch(function (err) {
          console.log(err);
        })

    }).catch(function (error) {
      //Please check the console for errors
      console.log(error);
    });
    let callmicrosoftLogin = (token) => {
      this.serverHotmailLogin(token);
    }
  }

  /**
   * @param {String} token
   * Send accessToken for authentication login with microSoft 
   */
  serverHotmailLogin(token) {
    this.isLoad = true;
    console.log("login token of hotmail lofin response", token);
    this._loginService.serverHotmailLogin(token)
      .subscribe((data: any) => {
        this.isLoad = false;
        let firstName = data.data.firstName
        let lastName = data.data.lastName
        this.userName = firstName + " " + lastName;
        localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        localStorage.setItem('userName', JSON.stringify(this.userName));

        if (this.eventIdWithLogin) {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home/view-event/', this.eventIdWithLogin])
        }
        else {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
          this.router.navigate(['/home']);
        }
      }, err => {
        console.log(err);
        this.alertService.getError(err.messege);
      })
  }

  /**
   * Login with yahoo mail 
   */
  yahooLogin() {
    console.log("Provider", provider);
    firebase.auth().signInWithPopup(provider)
      .then(function (result: any) {
        console.log("Response From yahoo", result, result.credential.accessToken);
        callYahooLogin(result.credential.accessToken, result.additionalUserInfo.profile.sub);
      })
      .catch(function (error) {
        console.log("Error From yahoo", error);
      });
    let callYahooLogin = (token, userId) => {
      this.serverYahooLogin(token, userId);
    }
  }

  /**
   * @param {String} token 
   * @param {String} userId
   * Send accessToken and userId fot authentication  
   */
  serverYahooLogin(token, userId) {
    this.isLoad = true;
    console.log("generated token of yahoo", token);
    this._loginService.sendYahooToken(token, userId)
      .subscribe(data => {
        this.isLoad = false
        let firstName = data.data.firstName
        let lastName = data.data.lastName
        this.userName = firstName + " " + lastName;
        localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        localStorage.setItem('userName', JSON.stringify(this.userName));

        if (this.eventIdWithLogin) {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home/view-event/', this.eventIdWithLogin])
        }
        else {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
          this.router.navigate(['/home']);
        }
      }, err => {
        console.log(err);
        this.alertService.getError(err.messege);
      })
  }

  /**
   * function of display error 
   */
  get f() { return this.loginForm.controls; }

  get g() { return this.forgotPasswordForm.controls; }

  /**
   * @param {JSON} email,password
   * for login with created email and password
   */
  onSubmitLogin() {
    this.isLoad = true;
    this.isDisable = true;
    console.log("login details", this.loginForm);
    this._loginService.login(this.loginForm.value)
      .subscribe(data => {
        this.isLoad = false;
        let firstName = data.data.firstName
        let lastName = data.data.lastName
        this.userName = firstName + " " + lastName;
        console.log(this.userName);
        console.log("response of login user", data);
        // this.userRole = data.data.UserRole;
        console.log("admin login entry", data.data.UserRole);
        localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        localStorage.setItem('userName', JSON.stringify(this.userName));
        console.log(this.isCelebrant);
        this.isDisable = true;
        if (this.eventIdWithLogin) {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home/view-event/', this.eventIdWithLogin])
        } else if (data.data.UserRole == 'admin') {
          this.router.navigate(['/home/admin-dashboard']);
        } else if (data.data.UserRole == 'user') {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home']);
        }
      }, (err: any) => {
        this.isLoad = false;
        this.alertService.getError(err.error.message)
        this.isDisable = false;
        this.loginForm.reset();
      })
  }

  /**
   * Login with google account  
   */
  signInWithGoogleAccount() {
    this.isLoad = true;
    this.isDisable = true;
    console.log("In func")
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
      const googleIdToken = res.idToken;
      console.log("google id of login user", googleIdToken);
      this._loginService.googleLogin(googleIdToken).subscribe(data => {
        this.isLoad = false;
        let firstName = data.data.firstName
        let lastName = data.data.lastName
        this.userName = firstName + " " + lastName;
        console.log(this.userName);
        console.log("response of login user", data);
        // this.userRole = data.data.UserRole;
        console.log("admin login entry", data.data.UserRole);
        localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        localStorage.setItem('userName', JSON.stringify(this.userName));
        console.log("response positive of google", data);
        if (this.eventIdWithLogin) {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home/view-event/', this.eventIdWithLogin])
        }
        else {
          this.isDisable = false;
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home']);
        }
      }, err => {
        this.isLoad = false;
        console.log("error display", err);
        this.alertService.getError(err.error.message);
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  /**
   * Login with facebook account
   */
  signWithFacebook() {
    this.isLoad = true;
    this.isDisable = true;
    console.log("submit login to facebook");
    FB.login((response) => {
      console.log('submitLogin', response);
      let facebookId = response.authResponse.accessToken;
      console.log("facebook id of user", facebookId);
      if (response.authResponse) {
        this._loginService.facebookLogin(facebookId)
          .subscribe((data: any) => {
            this.isLoad = false
            console.log("data of facebook login user", data);
            let firstName = data.data.firstName
            let lastName = data.data.lastName
            this.userName = firstName + " " + lastName;
            localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
            localStorage.setItem('userName', JSON.stringify(this.userName));

            if (this.eventIdWithLogin) {
              this.isUserLoggedIn = true;
              localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
              this.router.navigate(['/home/view-event/', this.eventIdWithLogin])
            }
            else {
              this.router.navigate(['/home']);
              this.isDisable = false;
              this.isUserLoggedIn = true;
              localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
            }
          }, err => {
            this.isLoad = false;
            console.log("error display", err);
            this.alertService.getError(err.error.message);
          })
      }
      else {
        console.log('User login failed');
      }
    });

  }

  /**
   * Forgot password functionality
   */
  submitForgotPassword() {
    console.log("body", this.forgotPasswordForm.value);
    $('#exampleModal').modal('toggle');
    this._loginService.forgotPassword(this.forgotPasswordForm.value)
      .subscribe((data: any) => {
        console.log("response of forgot password", data);
        this.alertService.getSuccess(data.message);
        // this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      })
  }

  /**
   * Show password when user login 
   */
  password() {
    this.show = !this.show;
    this.pwd = !this.pwd;
  }

}




// main-es2015.a12f6de474005ab90da6.js:1 ERROR Error: Uncaught (in promise): Error: Cannot match any routes. URL Segment: 'id_token'
// Error: Cannot match any routes. URL Segment: 'id_token'
//     at Nt.noMatchError (main-es2015.a12f6de474005ab90da6.js:1)
//     at u.expandSegmentGroup.pipe.pipe.e [as selector] (main-es2015.a12f6de474005ab90da6.js:1)
//     at u.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at o._error (main-es2015.a12f6de474005ab90da6.js:1)
//     at o.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at o._error (main-es2015.a12f6de474005ab90da6.js:1)
//     at o.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at o._error (main-es2015.a12f6de474005ab90da6.js:1)
//     at o.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at u._error (main-es2015.a12f6de474005ab90da6.js:1)
//     at u.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at C._error (main-es2015.a12f6de474005ab90da6.js:1)
//     at C.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at c.notifyError (main-es2015.a12f6de474005ab90da6.js:1)
//     at r._error (main-es2015.a12f6de474005ab90da6.js:1)
//     at r.error (main-es2015.a12f6de474005ab90da6.js:1)
//     at P (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at P (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at C.t.scheduleMicroTask (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at a.invokeTask (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at Object.onInvokeTask (main-es2015.a12f6de474005ab90da6.js:1)
//     at a.invokeTask (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at t.runTask (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at _ (polyfills-es2015.5728f680576ca47e99fe.js:1)
//     at r (bluebird.min.js:31)
//     at r._settlePromiseFromHandler (bluebird.min.js:30)
//     at r._settlePromise (bluebird.min.js:30)
//     at r._settlePromiseCtx (bluebird.min.js:30)
//     at r._drainQueue (bluebird.min.js:29)
//     at r._drainQueues (bluebird.min.js:29)
//     at drainQueues (bluebird.min.js:29)
//     at MutationObserver.<anonymous> (bluebird.min.js:30)