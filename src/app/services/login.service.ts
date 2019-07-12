import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {config} from '../config';
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isUserLoggedIn: false;

  constructor( private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }


  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;


  public get currentUserValue(): any {
    return this.currentUserSubject.value;
}


  login(userCredentials){
    console.log("helloooooooo");
    const eventToken = JSON.parse(localStorage.getItem('newEventId'));
    if(eventToken)
    {
      userCredentials.eventId = eventToken;
      console.log("userdata",userCredentials);
      return this.http.post<any>(config.baseApiUrl +"api/login" , userCredentials)
      .pipe(map(user=>{
        console.log("login user detaislllllllllll======",user);
        if(user && user.data.accessToken){
          // localStorage.setItem('currentUser', JSON.stringify(user.data));
          localStorage.setItem('currentUser',JSON.stringify(user.data.accessToken));
          this.currentUserSubject.next(user);
        }
        return user;
      }))
    }
    else{
      return this.http.post<any>(config.baseApiUrl +"api/login" , userCredentials)
      .pipe(map(user=>{
        console.log("login user detaislllllllllll======",user);
        if(user && user.data.accessToken){
          // localStorage.setItem('currentUser', JSON.stringify(user.data));
          localStorage.setItem('currentUser',JSON.stringify(user.data.accessToken));
          this.currentUserSubject.next(user);
        }
        return user;
      }))
    }
    
  }

  signUp(details){
    return this.http.post(config.baseApiUrl + "api/signup" , details);
  }


  checkId(id_token){
    // console.log("google idtoken", id_token);
    var body = {
      id_token: id_token
    }
    console.log(body);
    return this.http.post<any>(config.baseApiUrl + "api/login/google", body)
    .pipe(map(googleUser=>{
      console.log("google login user accesstoken",googleUser);
      if(googleUser && googleUser.data.accessToken){
        localStorage.setItem('currentUser', JSON.stringify(googleUser.data.accessToken));
      }
      return googleUser;
    }))
  }

  checkFacebookId(accessToken){
    console.log("facebook id", accessToken);
    var body = {
      sFaceBookSecretId: accessToken
    }
    return this.http.post<any>(config.baseApiUrl + "api/login/facebook", body)
    .pipe(map(facebookUser=>{
      console.log("facebook user jwt token", facebookUser);
      if(facebookUser && facebookUser.data.accessToken){
        localStorage.setItem('currentUser', JSON.stringify(facebookUser.data.accessToken));
      }
    }))
  }



  forgotPassword(data){
    console.log("forgot password email", data);
    return this.http.post(config.baseApiUrl + "api/forgotpassword", data);
  }

  resetPassword(data){
    return this.http.post(config.baseApiUrl + "api/changepassword", data)
  }

    
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accessToken');
    this.currentUserSubject.next(null);
    this.isUserLoggedIn = false;
    localStorage.setItem('isUserLoggedIn', JSON.stringify(this.isUserLoggedIn));
}
}

