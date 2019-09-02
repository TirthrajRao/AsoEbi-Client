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
  
  constructor(private router: Router, private _loginService: LoginService, private alertService: AlertService) { }

  ngOnInit() {

    // menu toggle start
    $(".new_event_menu").click(function(){
      $(".new_event_menu_box").toggle();
    });
    // menu toggle end

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
     console.log(form.value.newPassword == form.value.confirmPassword, this.match);
     if (form.value.newPassword === form.value.confirmPassword) {
       console.log("In true condition");
       this.match = true;
     } else {
       this.match = false;
     }
   }

 }
