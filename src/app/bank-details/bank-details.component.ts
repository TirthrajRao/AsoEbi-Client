import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  bankDetailsForm: FormGroup;
  isDisable = false;
  submitted = false;
  constructor(private router: Router, private _loginService: LoginService, private _alertService: AlertService) { }

  ngOnInit() {

    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      accountNumber: new FormControl('',[Validators.required,Validators.minLength(16), Validators.maxLength(16)]),
      IFSCCode: new FormControl('',[Validators.required,Validators.minLength(9), Validators.maxLength(9)])
    })
  }


  /**
   * Display error message
   */
  get f() { return this.bankDetailsForm.controls; }

  onSubmit(data) {
    console.log(this.bankDetailsForm);
    this.submitted = true;
    if (this.bankDetailsForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._loginService.addBankDetails(this.bankDetailsForm.value)
      .subscribe((data: any) => {
        console.log("data of bank details", data);
        this._alertService.getSuccess(data.message)
        this.bankDetailsForm.reset();
      }, (err:any) => {
        console.log(err);
        this._alertService.getError(err.message);
      })

  }

  validateBankName(form) {
    console.log(form);
    const nameInput = /[a-zA-Z ]/;
    let message1 = document.getElementById('message1');
    if (!form.bankName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }
  validateAccountNumber(form){

    console.log(form);
    const phoneno = /[0-9]/;
    let message = document.getElementById('message');
    if (!form.accountNumber.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";
    }
  }
  validateIFSCCode(form){
    console.log(form);
    const phoneno = /[0-9]/;
    let message = document.getElementById('message');
    if (!form.IFSCCode.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";
    
  }
}
}