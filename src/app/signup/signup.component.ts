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
  email;
  isLoad = false;
  newUserName;
  show2: boolean;
  pwd2: boolean;

  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService, private _alertService: AlertService) { }

  ngOnInit() {

    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });

    /**
     * SignUp form for new user
     */
    this.signUpForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    })
  }


  /**
   * Display error message for signUp form
   */
  get f() { return this.signUpForm.controls; }


  /**
   * Display error message for personalDetails form
   */
  // get p() { return this.personalDetailsForm.controls }

  /**
   * @param {String} form
   * Validation of firstName in signUp form  
   */
  validateFirstName(form) {
    console.log(form);
    const nameInput = /[a-zA-Z ]/;

    $("#firstName").on({
      keydown: function (e) {
        if (e.which === 32)
          return false;
      },
      change: function () {
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
    this.isDisable = false;
    console.log(form);
    const nameInput = /[a-zA-Z ]/;
    $("#lastName").on({
      keydown: function (e) {
        if (e.which === 32)
          return false;
      },
      change: function () {
        this.value = this.value.replace(/\s/g, "");
      }
    });
    let message1 = document.getElementById('message2');
    if (!form.firstName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }

  /**
   * @param {String} form
   * Validation of phoneNumber in signUp form  
   */
  // validatePhone(form) {
  //   console.log(form);
  //   const phoneno = /[0-9]{10}/;
  //   let message = document.getElementById('message');
  //   if (!form.mobile.match(phoneno)) {
  //     console.log("message==========", message)
  //     message.innerHTML = "Please enter only numbers"
  //   } else {
  //     message.innerHTML = "";
  //   }
  // }

  validatePhone(form) {
    console.log(form)
    var field1 = (<HTMLInputElement>document.getElementById("mobile")).value;
    let message = document.getElementById('message3');
    console.log(field1);
    if (/[a-zA-Z]/g.test(field1)) {
      message.innerHTML = "Please enter only numbers"
    }
    else if (!(/[0-9]{10}/.test(field1))) {
      console.log("Please enter valid number");
      if (field1.length < 10) {
        message.innerHTML = "Please enter 10 digit number";
      }
    } else {
      message.innerHTML = ""
      console.log("Valid entry");
    }
  }

  /**
   * @param {Object} data
   * Create new signUp user with details 
   */
  // onSubmit() {
  //   this.isLoad = true;
  //   this.submitted = true;
  //   if (this.signUpForm.invalid) {
  //     return;
  //   }
  //   this.isDisable = true;
  //   this._loginService.signUpOfEmail(this.signUpForm.value)
  //     .subscribe((data: any) => {
  //       console.log("signup user details", data);
  //       this._alertService.getSuccess(data.message);
  //       $('.firstStep').css({ 'display': 'none' })
  //       $('.thirdStep').css({ 'display': 'block' });
  //       this.isDisable = false;
  //       this.isLoad = false;
  //       this.signUpDetails = data.data.email;
  //       console.log("first sign up details", this.signUpDetails);
  //     }, err => {
  //       console.log(err);
  //       this._alertService.getError(err.message);
  //       this.isDisable = true;
  //     })
  // }
  onSubmit() {
    this.isLoad = true;
    setTimeout(() => {

      $('.firstStep').css({ 'display': 'none' })
      $('.thirdStep').css({ 'display': 'block' });
    }, 500)
    this.isLoad = false;
  }

  verifyCode(data) {
    this.isLoad = true;
    console.log("data", data);
    const verified = {
      code: data,
      email: this.email
    }
    this._loginService.verificationCode(verified)
      .subscribe((data: any) => {
        console.log("positive response", data);
        this.isLoad = false;
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      })
  }


  /**
   * 
   * @param {Object} data
   * Add other details of new user after verification  
   */
  personalDetails() {
    this.isLoad = true;
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    console.log(this.signUpForm.value);
    this._loginService.signUpOfEmail(this.signUpForm.value)
      .subscribe((data: any) => {
        console.log("final response", data);
        this.email = data.data.email
        console.log(this.email);
        this.newUserName = data.data.firstName;
        $('.thirdStep').css({ 'display': 'none' });
        $('.secondStep').css({ 'display': 'block' })
        this.isLoad = false;
        this._alertService.getSuccess(data.message);
        // this.router.navigate(['/login']);
      }, err => {
        this.isLoad = false;
        this._alertService.getError(err.error.message)
        console.log(err);
        // this.router.navigate(['/login']);
      })
  }

  nextSection(goto, from) {
    $('.' + goto).css({ 'display': 'block' });
    $('.' + from).css({ 'display': 'none' })
  }


  password2() {
    this.show2 = !this.show2;
    this.pwd2 = !this.pwd2;
  }

}
