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
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
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
    console.log("helloooooooo", userCredentials);
    const eventToken = JSON.parse(sessionStorage.getItem('newEventId'));
    console.log("login with link ", eventToken);
    if (eventToken) {
      // userCredentials.eventId = eventToken;
      // console.log("userdata", userCredentials);
      return this.http.post<any>(config.baseApiUrl + "api/login", userCredentials)
        .pipe(map(user => {
          console.log("login user detaislllllllllll======", user);
          if (user && user.data.accessToken) {
            sessionStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
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
            // sessionStorage.setItem('currentUser', JSON.stringify(user.data));
            sessionStorage.setItem('currentUser', JSON.stringify(user.data.accessToken));
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
  signUpOfEmail(details) {
    return this.http.post(config.baseApiUrl + "api/signup", details);
  }

  /**
   * @param {String} id_token
   * Login with google  
   */
  googleLogin(id_token) {
    const body = {
      id_token: id_token
    }
    console.log(body);
    return this.http.post<any>(config.baseApiUrl + "api/login/google", body)
      .pipe(map(googleUser => {
        console.log("google login user accesstoken", googleUser);
        if (googleUser && googleUser.data.accessToken) {
          sessionStorage.setItem('googleUser', JSON.stringify(googleUser.data.accessToken));
          sessionStorage.setItem('userRole',JSON.stringify(googleUser.data.UserRole));
          this.currentUserSubject.next(googleUser);
        }
        return googleUser;
      }))
  }

  /**
   * @param {String} accessToken
   * Login with Facebook 
   */
  facebookLogin(accessToken) {
    console.log("facebook id", accessToken);
    const body = {
      sFaceBookSecretId: accessToken
    }
    return this.http.post<any>(config.baseApiUrl + "api/login/facebook", body)
      .pipe(map(facebookUser => {
        console.log("facebook user jwt token", facebookUser);
        if (facebookUser && facebookUser.data.accessToken) {
          sessionStorage.setItem('facebookUser', JSON.stringify(facebookUser.data.accessToken));
          sessionStorage.setItem('userRole',JSON.stringify(facebookUser.data.UserRole));
          this.currentUserSubject.next(facebookUser);

        }
        return facebookUser;
      }))
  }


  /**
   * @param {string} token
   * Send token for hotmail login 
   */
  serverHotmailLogin(token) {
    console.log("login token of hotmail in service", token);
    const body = {
      accessToken: token
    }
    return this.http.post(config.baseApiUrl + "api/login/outlook", body)
      .pipe(map((microsoftUser: any) => {
        console.log("hotmaail login user token", microsoftUser);
        if (microsoftUser && microsoftUser.data.accessToken) {
          sessionStorage.setItem('microsoftUser', JSON.stringify(microsoftUser.data.accessToken));
          sessionStorage.setItem('userRole',JSON.stringify(microsoftUser.data.UserRole));
          this.currentUserSubject.next(microsoftUser);
        }
        return microsoftUser;
      }))
  }

  /** 
   * @param token 
   * @param userId 
   * Send accessToken and userID for authentication
   */
  sendYahooToken(token, userId) {
    console.log(token, userId);
    const body = {
      accessToken: token,
      userId: userId
    }
    console.log("yahoo user login ", body);
    return this.http.post(config.baseApiUrl + "api/login/yahoo", body)
      .pipe(map((yahooUser: any) => {
        console.log("google login user accesstoken", yahooUser);
        if (yahooUser && yahooUser.data.accessToken) {
          sessionStorage.setItem('yahooUser', JSON.stringify(yahooUser.data.accessToken));
          sessionStorage.setItem('userRole',JSON.stringify(yahooUser.data.UserRole));
          this.currentUserSubject.next(yahooUser);
        }
        return yahooUser;
      }))
  }

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
      sessionStorage.removeItem('currentUser');
      sessionStorage.removeItem('facebookUser');
      sessionStorage.removeItem('googleUser');
      sessionStorage.removeItem('microsoftUser');
      sessionStorage.removeItem('yahooUser');
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('isUserLoggedIn');
      sessionStorage.removeItem('isCelebrant');
      sessionStorage.removeItem('newEventId');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('isGuestJoined');
      sessionStorage.removeItem('userName');
      this.currentUserSubject.next(null);
  }


  /**
   * @param {Object} data
   * Add bank details of user 
   */
  addBankDetails(data) {
    return this.http.put(config.baseApiUrl + "api/account", data);
  }

  /**
   * 
   * @param {Object} data
   * Check verification code for new register user 
   */
  verificationCode(data) {
    console.log(data);
    return this.http.put(config.baseApiUrl + "api/email-verify", data);
  }

  /**
   * @param {Object} details
   * Add more other details of new user 
   */
  personalDetails(details) {
    console.log(details);
    return this.http.put(config.baseApiUrl + "api/addProfile", details);
  }
}


