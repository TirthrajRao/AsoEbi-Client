import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {LoginService} from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  private sub: any;
  private hash: any;
  forgotPasswordForm : FormGroup;
  match: boolean = false;
  isDisable = false;


  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService) {
      this.sub = this.route.params.subscribe(params=>{
        this.hash = params.id;
        console.log(this.hash);
      })
     }

  ngOnInit() {
    this.forgotPasswordForm = new FormGroup({
      newPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(20)])
    })
  }


  resetPassword(hash){
    this.isDisable = true;
    console.log("current password value",this.forgotPasswordForm.value);
    this._loginService.forgotPasswordWithLink(this.forgotPasswordForm.value, this.hash)
    .subscribe(data=>{
      console.log("reset password done by user", data);
      this.isDisable = false;
      Swal.fire({type: 'success',title: 'Password Change Successfully',showConfirmButton:false,timer: 2000})
      this.router.navigate(['/login']);
    }, err=>{
      console.log(err);
    })
  }
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
