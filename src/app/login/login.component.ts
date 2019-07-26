import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { HttpErrorResponse } from '@angular/common/http';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { YahooService } from '../services/yahoo.service';
import { Profile } from 'selenium-webdriver/firefox';
import { async } from '@angular/core/testing';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpc5SskcxLBusW13gIpsKNYeKK-TlLzsw",
  authDomain: "aso-ebi-cdbf9-136fb.firebaseapp.com",
  databaseURL: "https://aso-ebi-cdbf9-136fb.firebaseio.com",
  projectId: "aso-ebi-cdbf9",
  storageBucket: "",
  messagingSenderId: "1021800185546",
  appId: "1:1021800185546:web:0b3e09d6183792d7"
};


firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.OAuthProvider('yahoo.com');
provider.setCustomParameters({
  // Prompt user to re-authenticate to Yahoo.
  prompt: 'login',
});
// provider.addScope('mail-r');



declare var FB: any;
declare var Msal: any;
var graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};

var requestObj = {
  scopes: ["user.read"]
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// Register Callbacks for redirect flow
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  returnUrl: string;
  FB: any;
  isUserLoggedIn = false;
  isDiable = false;
  eventIdWithLogin;
  isGuestJoined;
  isCelebrant;
  userRole;
  isAuthenticated = false;
  profile: any;
  private auth0Client: Auth0Client;
  hotmailToken;

  msalConfig = {
    auth: {
      clientId: 'bd9b8a24-97aa-42db-a5fe-dcb24b15e6f8', //This is your client ID,
      authority: "https://login.microsoftonline.com/common", //This is your tenant info
      // scopes: ["user.read"]
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: true
    }
  };
  myMSALObj = new Msal.UserAgentApplication(this.msalConfig);




  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService, private authService: AuthService, private _yahooService: YahooService,
  ) {

  }

  async ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

    this.forgotPasswordForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });

    /**
     * Login with facebook 
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
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.3&appId=350939005533804&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));



    // yahooLogin //

    this.auth0Client = await this._yahooService.getAuth0Client();

    // Watch for changes to the isAuthenticated state
    this._yahooService.isAuthenticated.subscribe(value => {
      this.isAuthenticated = value;
    });

    // Watch for changes to the profile data
    this._yahooService.profile.subscribe(profile => {
      this.profile = profile;
    });
  }


  /**
 * Logs in the user by redirecting to Auth0 for authentication
 */
  async login() {
    await this.auth0Client.loginWithRedirect({});
  }

  signIn() {
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
  }

  yahooLogin() {
    console.log("Provider", provider);

    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        console.log("Response From yahoo",result);
        console.log("Response From yahoo",result.credential.accessToken);
      })
      .catch(function (error) {
        console.log("Error From yahoo", error);
      });
  }


  /**
   * function of display error 
   */
  get f() { return this.loginForm.controls; }

  /**
   * @param {JSON} email,password
   * for login with created email and password
   */
  onSubmitLogin() {
    this.isDiable = true;
    console.log("login details", this.loginForm);
    this._loginService.login(this.loginForm.value)
      .subscribe(data => {
        console.log("response of login user", data);
        // this.userRole = data.data.UserRole;
        console.log("admin login entry", data.data.UserRole);
        localStorage.setItem('userRole', JSON.stringify(data.data.UserRole));
        this.isGuestJoined = data.data.isGuestJoined;
        console.log("this.isGuestJoined", this.isGuestJoined);
        // localStorage.setItem('isGuestJoined', JSON.stringify(this.isGuestJoined));
        this.isCelebrant = data.data.isCelebrant;
        console.log(this.isCelebrant);
        // localStorage.setItem('isCelebrant', JSON.stringify(this.isCelebrant))
        this.eventIdWithLogin = data.data.eventId;
        console.log("login with event iddddddd", this.eventIdWithLogin);
        if (this.eventIdWithLogin) {
          this.isUserLoggedIn = true;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/welcome-guest', this.eventIdWithLogin]);
        }
        else if (data.data.UserRole == 'admin') {
          this.router.navigate(['/home/admin-dashboard']);
        }
        else {
          this.isUserLoggedIn = true;
          this.isDiable = false;
          localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
          this.router.navigate(['/home']);
        }
      }, error => {
        console.log(error);
        let errorMessege = error.statusText;
        this.isDiable = false;
        this.loginForm.reset();
        console.log("disable:", this.isDiable);
        console.log("display error messege", errorMessege);
      })
  }

  /**@param {JSON} email, password
   * Login with google email address 
   */
  signInWithGoogleAccount() {
    this.isDiable = true;
    console.log("In func")
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((res) => {
      console.log(res);
      var googleIdToken = res.idToken;
      console.log("google id of login user", googleIdToken);
      this._loginService.checkId(googleIdToken).subscribe(data => {
        console.log("response positive of google", data);
        this.isDiable = false;
        this.isUserLoggedIn = true;
        localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
        this.router.navigate(['/home']);
      }, err => {
        console.log("error display", err);
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  /**@param {JSON} email, password
   * Login with facebook email address 
   */
  submitLogin() {
    this.isDiable = true;
    console.log("submit login to facebook");
    FB.login((response) => {
      console.log('submitLogin', response);
      let facebookId = response.authResponse.accessToken;
      console.log("facebook id of user", facebookId);
      if (response.authResponse) {
        this._loginService.checkFacebookId(facebookId)
          .subscribe(data => {
            console.log("data of facebook login user", data);
            this.isDiable = false;
            this.isUserLoggedIn = true;
            localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
            this.router.navigate(['/home']);
          }, err => {
            console.log(err);
          })
      }
      else {
        console.log('User login failed');
      }
    });

  }

  /**@param {JSON} email
   * If password forgot send link in your gmail account with registerd email while signUp
   */
  submitForgotPassword() {
    console.log("body", this.forgotPasswordForm);
    this._loginService.forgotPassword(this.forgotPasswordForm.value)
      .subscribe(data => {
        console.log("response of forgot password", data);
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      })
  }

  /**
  * Logs in the user by redirecting to Auth0 for authentication
  */
  // async login() {
  //   await this.auth0Client.loginWithRedirect({});
  //   // this.router.navigate(['/home']);
  // }

  /**
  * Logs the user out of the applicaion, as well as on Auth0
  */
  logout() {
    this.auth0Client.logout({
      client_id: this._yahooService.config.client_id,
      returnTo: window.location.origin
    });
  }

}
