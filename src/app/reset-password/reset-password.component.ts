import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
declare var $: any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  match: boolean = false;
  isDisable = false;
  show1: boolean;
  show2: boolean;
  show3: boolean;
  pwd3: boolean;
  pwd1: boolean;
  pwd2: boolean;
  userName = JSON.parse(sessionStorage.getItem('userName'));

  constructor(private router: Router, private _loginService: LoginService, private alertService: AlertService) { }

  ngOnInit() {

    // menu toggle start
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    // menu toggle end


    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
    });

    /**
     * Reset password form
     */
    this.resetPasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
  }

  /**
   * Reset password functionality
   */
  resetPassword() {
    this.isDisable = true;
    delete this.resetPasswordForm.value['confirmPassword']
    console.log("current password value", this.resetPasswordForm.value);
    this._loginService.resetPassword(this.resetPasswordForm.value)
      .subscribe(data => {
        console.log("reset password done by user", data);
        this.isDisable = false;
        this.router.navigate(['/home']);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * To show enterd newPassword and confirmPassowrd are same or not   
   */
  comparePassword(form) {
    this.isDisable = true
    console.log(form.value.newPassword == form.value.confirmPassword, this.match);
    if (form.value.newPassword === form.value.confirmPassword) {
      console.log("In true condition");
      this.match = true;
      this.isDisable = false
    } else {
      this.match = false;
    }
  }
  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }

  password1() {
    this.show1 = !this.show1;
    this.pwd1 = !this.pwd1;
  }

  password2() {
    this.show2 = !this.show2;
    this.pwd2 = !this.pwd2;
  }
  password3() {

    this.show3 = !this.show3;
    this.pwd3 = !this.pwd3;
  }
}
