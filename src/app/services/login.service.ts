import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {config} from '../config'
import {LoginComponent} from '../login/login.component';
import {SignupComponent} from '../signup/signup.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

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

  signUp(details){
    return this.http.post(config.baseApiUrl + "api/signup" , details);
  }
}

