import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {LoginService} from '../services/login.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required]) 
    })
  }



  onSubmit(data){
    this._loginService.signUp(this.signUpForm.value)
    .subscribe(data=>{
      console.log("signup user details",data);
      this.router.navigate(['/login']);
    })
  }

}
