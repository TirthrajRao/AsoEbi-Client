import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  personalDetailsForm: FormGroup;
  isDisable = false;
  submitted = false;
  signUpDetails;
  userId;

  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService, private _alertService: AlertService) { }

  ngOnInit() {
    /**
     * SignUp form for new user
     */
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
    this.personalDetailsForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      mobile: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    })
  }

  
  /**
   * Display error message for signUp form
   */
  get f() { return this.signUpForm.controls; }


  /**
   * Display error message for personalDetails form
   */
  get p() { return this.personalDetailsForm.controls }

  /**
   * @param {String} form
   * Validation of firstName in signUp form  
   */
  validateFirstName(form) {
    console.log(form);
    const nameInput = /[a-zA-Z ]/;

    $("#firstName").on({
      keydown: function(e) {
        if (e.which === 32)
          return false;
      },
      change: function() {
        this.value = this.value.replace(/\s/g, "");
      }
     });
    let message1 = document.getElementById('message1');
    if (!form.firstName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }

  /**
   * @param {String} form
   * Validation of lastName in signUp form  
   */
  validateLastName(form) {
    console.log(form);
    const nameInput = /[a-zA-Z ]/;
    let message2 = document.getElementById('message2');
    if (!form.lastName.match(nameInput)) {
      console.log("message==========", message2)
      message2.innerHTML = "Name can not start with digit"
    } else {
      message2.innerHTML = "";
    }
  }

  /**
   * @param {String} form
   * Validation of phoneNumber in signUp form  
   */
  validatePhone(form) {
    console.log(form);
    const phoneno = /[0-9]{10}/;
    let message = document.getElementById('message');
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
    this._loginService.signUpOfEmail(this.signUpForm.value)
      .subscribe((data: any) => {
        console.log("signup user details", data);
        this._alertService.getSuccess(data.message);
        $('.firstStep').css({ 'display': 'none' })
        $('.secondStep').css({ 'display': 'block' });
        this.isDisable = false;
        this.signUpDetails = data.data.email;
        console.log("first sign up details", this.signUpDetails);
      }, err => {
        console.log(err);
        this._alertService.getError(err.message);
        this.isDisable = true;
      })
  }

  /**
   * @param {Object} data
   * Check verification code for new register user 
   */
  verifyCode(data) {
    console.log("data", data);
    const verified = {
      code: data,
      email: this.signUpDetails
    }
    this._loginService.verificationCode(verified)
      .subscribe((data: any) => {
        console.log("positive response", data);
        this.userId = data.data.userId;
        console.log(this.userId);
        $('.secondStep').css({ 'display': 'none' });
        $('.thirdStep').css({ 'display': 'block' })
      }, err => {
        console.log(err);
      })
  }


  /**
   * 
   * @param {Object} data
   * Add other details of new user after verification  
   */
  personalDetails(data) {
    console.log(this.personalDetailsForm.value);
    const finalDetails = {
      details: this.personalDetailsForm.value,
      userId: this.userId
    }
    this._loginService.personalDetails(finalDetails)
      .subscribe((data: any) => {
        console.log("final response", data);
        $('.thirdStep').css({ 'display': 'none' });
        $('.fourthStep').css({ 'display': 'block' })
        this._alertService.getSuccess(data.message);
        // this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      })
  }

  nextSection(goto, from) {
    $('.' + goto).css({ 'display': 'block' });
    $('.' + from).css({ 'display': 'none' })
  }

}
