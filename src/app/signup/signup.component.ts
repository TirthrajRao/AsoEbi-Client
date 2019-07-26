import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import {AlertService} from '../services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isDisable = false;
  submitted = false;

  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService,private _alertService: AlertService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    })
  }

  /**
   * Display error message
   */
  get f() { return this.signUpForm.controls; }

  /**
   * @param {String} form
   * Validation of firstName  
   */
  validateFirstName(form) {
    console.log(form);
    var nameInput = /[a-zA-Z ]/;
    var message1 = document.getElementById('message1');
    if (!form.firstName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }

  /**
   * @param {String} form
   * Validation of lastName  
   */
  validateLastName(form) {
    console.log(form);
    var nameInput = /[a-zA-Z ]/;
    var message2 = document.getElementById('message2');
    if (!form.lastName.match(nameInput)) {
      console.log("message==========", message2)
      message2.innerHTML = "Name can not start with digit"
    } else {
      message2.innerHTML = "";
    }
  }

  /**
   * @param {String} form
   * Validation of phoneNumber  
   */
  validatePhone(form) {
    console.log(form);
    var phoneno = /[0-9]/;
    var message = document.getElementById('message');
    if (!form.mobile.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";
    }
  }

  /**
   * @param {Object} data
   * Create new signUp user with details 
   */
  onSubmit(data) {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._loginService.signUp(this.signUpForm.value)
      .subscribe((data:any) => {
        console.log("signup user details", data);
        let message 
        this._alertService.getSuccess(data.message)
        this.isDisable = false;
        this.router.navigate(['/login']);
      })
  }

}
