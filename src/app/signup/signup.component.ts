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
  isDisable = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required]) ,
      mobile : new FormControl(''),
    })
  }



  onSubmit(data){
    this.isDisable = true;
    this._loginService.signUp(this.signUpForm.value)
    .subscribe(data=>{
      console.log("signup user details",data);
      this.isDisable = false;
      this.router.navigate(['/login']);
    })
  }

}
