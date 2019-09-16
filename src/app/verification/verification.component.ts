import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
declare var $: any;

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  isLoad = false;
  varificationEmail = JSON.parse(sessionStorage.getItem('varificationEmail'));
  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService, private _alertService: AlertService) { }

  ngOnInit() {
    console.log(this.varificationEmail);
  }

    /**
   * @param {Object} data
   * Check verification code for new register user 
   */
  verifyCode(data) {
    this.isLoad = true;
    console.log("data", data);
    const verified = {
      code: data,
      email: this.varificationEmail
    }
    this._loginService.verificationCode(verified)
      .subscribe((data: any) => {
        console.log("positive response", data);
        this.isLoad = false;
        sessionStorage.removeItem('varificationEmail');
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
      })
  }

}
