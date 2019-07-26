import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isUserLoggedIn: false;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /**
   * @param {Object} userCredentials
   * Login for guest and celebrant  
   */
  login(userCredentials) {
    console.log("helloooooooo");
    const eventToken = JSON.parse(localStorage.getItem('newEventId'));
    console.log("login with link ", eventToken);
    if (eventToken) {
      userCredentials.eventId = eventToken;
      console.log("userdata", userCredentials);
      return this.http.post<any>(config.baseApiUrl + "api/login", userCredentials)
        .pipe(map(user => {
          console.log("login user detaislllllllllll======", user);
          if (user && user.data.accessToken) {
            // localStorage.setItem('currentUser', JSON.stringify(user.data));
            localStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
            this.currentUserSubject.next(user);
          }
          return user;
        }))
    }
    else {
      return this.http.post<any>(config.baseApiUrl + "api/login", userCredentials)
        .pipe(map(user => {
          console.log("login user detaislllllllllll======", user);
          if (user && user.data.accessToken) {
            // localStorage.setItem('currentUser', JSON.stringify(user.data));
            localStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
            this.currentUserSubject.next(user);
          }
          return user;
        }))
    }

  }

  /**
   * @param {Object} details
   * SignUp form form new user  
   */
  signUp(details) {
    return this.http.post(config.baseApiUrl + "api/signup", details);
  }

  /**
   * @param {String} id_token
   * Login with google  
   */
  checkId(id_token) {
    var body = {
      id_token: id_token
    }
    console.log(body);
    return this.http.post<any>(config.baseApiUrl + "api/login/google", body)
      .pipe(map(googleUser => {
        console.log("google login user accesstoken", googleUser);
        if (googleUser && googleUser.data.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(googleUser.data.accessToken));
        }
        return googleUser;
      }))
  }

  /**
   * @param {String} accessToken
   * Login with Facebook 
   */
  checkFacebookId(accessToken) {
    console.log("facebook id", accessToken);
    var body = {
      sFaceBookSecretId: accessToken
    }
    return this.http.post<any>(config.baseApiUrl + "api/login/facebook", body)
      .pipe(map(facebookUser => {
        console.log("facebook user jwt token", facebookUser);
        if (facebookUser && facebookUser.data.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(facebookUser.data.accessToken));
        }
      }))
  }


/**
 * @param {string} token
 * Send token for hotmail login 
 */
  hotMail(token) {
    console.log("login token of hotmail in service", token);
    var body = {
      accessToken: token
    }
    // return this.http.post(config.baseApiUrl + "api/login/outlook", body);
  }

  // loginWithHotMail(){
  //  return this.http.get("https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=abe990aa-3a0c-42ae-a85c-989ea3b24c08&redirect_uri=http://localhost:4200&response_type=token&scope=openid+Mail.Read")
  // }

  /**
   * @param {Object} data
   * Send link of forgot password on email  
   */
  forgotPassword(data) {
    console.log("forgot password email", data);
    return this.http.post(config.baseApiUrl + "api/forgotpassword", data);
  }

  /**
   * @param {Object} data
   * Reset new password  
   */
  resetPassword(data) {
    return this.http.post(config.baseApiUrl + "api/changepassword", data)
  }
  /**
   * @param {Object} data 
   * @param {String} id
   * Create new password if forgot  
   */
  forgotPasswordWithLink(data, id) {
    return this.http.post(config.baseApiUrl + "api/reset-password/" + id, data)
  }

  /**
   * Logout from website
   */
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('isUserLoggedIn');
    localStorage.removeItem('isCelebrant');
    localStorage.removeItem('newEventId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('isGuestJoined');
  }
}

