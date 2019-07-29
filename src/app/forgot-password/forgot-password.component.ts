import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private sub: any;
  private hash: any;
  forgotPasswordForm: FormGroup;
  match: boolean = false;
  isDisable = false;

  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService, private alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.hash = params.id;
      console.log(this.hash);
    })
  }

  ngOnInit() {

    /**
     * Form of forgot password
     */
    this.forgotPasswordForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
  }

  /**
  * @param(hash) encrypted eventId
  * Generate new password when user forgot password 
  */
  resetPassword(hash) {
    this.isDisable = true;
    console.log("current password value", this.forgotPasswordForm.value);
    this._loginService.forgotPasswordWithLink(this.forgotPasswordForm.value, this.hash)
      .subscribe((data: any) => {
        console.log("reset password done by user", data);
        this.alertService.getSuccess(data.data.message);
        this.isDisable = false;
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {JSON} form
   * Comapre new password and confirm password  
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
