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
  submitted = false;

  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('',[Validators.required,Validators.minLength(2),  Validators.maxLength(20)]),
      lastName: new FormControl('',[Validators.required,Validators.minLength(2),  Validators.maxLength(20)]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6),Validators.maxLength(20)]) ,
      mobile : new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    })
  }



  get f() { return this.signUpForm.controls; }

  validateFirstName(form)
		{
			console.log(form);
			var nameInput = /[a-zA-Z ]/ ;
      var message1 = document.getElementById('message1');
      var message2 = document.getElementById('message2');
			if(!form.firstName.match(nameInput)){
				console.log("message==========",message1)
				message1.innerHTML = "Name can not start with digit"
			}else{
				message1.innerHTML = "";
      }
    }
    
  
    validateLastName(form)
		{
			console.log(form);
			var nameInput = /[a-zA-Z ]/ ;
      // var message1 = document.getElementById('message1');
      var message2 = document.getElementById('message2');
			if(!form.lastName.match(nameInput)){
				console.log("message==========",message2)
				message2.innerHTML = "Name can not start with digit"
			}else{
				message2.innerHTML = "";
      }
    }
    

		validatePhone(form)
		{
			console.log(form);
			var phoneno = /[0-9]/ ;
			var message = document.getElementById('message');
			if(!form.mobile.match(phoneno)){
				console.log("message==========",message)
				message.innerHTML = "Please enter only numbers"
			}else{
				message.innerHTML = "";
			}
		}

  /**@param(JSON) firstName,lastName,email,password,mobile
   * To login new user with submit this signup form    
   */
  onSubmit(data){
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._loginService.signUp(this.signUpForm.value)
    .subscribe(data=>{
      console.log("signup user details",data);
      this.isDisable = false;
      this.router.navigate(['/login']);
    })
  }

}
