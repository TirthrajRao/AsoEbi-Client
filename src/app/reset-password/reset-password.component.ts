import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {LoginService} from '../services/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm : FormGroup;
  match: boolean = false;
  isDisable = false;
  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      // email: new FormControl(''),
      currentPassword: new FormControl ('',[Validators.required]),
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
  }



  /**@param(JSON) currentPassword,newPassword,confirmPassword
   * To reset password of login user with matching newPassword  
   */
  resetPassword(){
    this.isDisable = true;
		delete this.resetPasswordForm.value['confirmPassword']
    console.log("current password value",this.resetPasswordForm.value);
    this._loginService.resetPassword(this.resetPasswordForm.value)
    .subscribe(data=>{
      console.log("reset password done by user", data);
      this.isDisable = false;
      Swal.fire({type: 'success',title: 'Password Change Successfully',showConfirmButton:false,timer: 2000})
      this.router.navigate(['/home']);
    }, err=>{
      console.log(err);
    })
  }


  /**
   * To show enterd newPassword and confirmPassowrd are same or not   
   */
	comparePassword(form){
		console.log(form.value.newPassword == form.value.confirmPassword, this.match);
		if(form.value.newPassword === form.value.confirmPassword){
			console.log("In true condition");
			this.match = true;
		}else{
			this.match = false;
		} 

	}

}
