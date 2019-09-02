import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { EventService } from '../services/event.service';

declare var $: any;

@Component({
  selector: 'app-bank-details',
  templateUrl: './bank-details.component.html',
  styleUrls: ['./bank-details.component.css']
})
export class BankDetailsComponent implements OnInit {
  bankDetailsForm: FormGroup;
  isDisable = false;
  submitted = false;
  bankDetails;
  selectedBank;
  constructor(private router: Router, private _loginService: LoginService,private _eventService: EventService, private _alertService: AlertService) { }

  ngOnInit() {
    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      IFSCCode: new FormControl('', [Validators.required, Validators.minLength(9), Validators.min(9)])
    })
    this.getBankDetails();
    // this.bankDetailsSlider()
  }

  /**
   * Display error message
   */
  get f() { return this.bankDetailsForm.controls; }

  /**
   * @param {json} data
   * Add bank account details of user
   */
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
      }, (err: any) => {
        console.log(err);
        this._alertService.getError(err.message);
      })

  }

  getBankDetails() {
    this._eventService.getBankDetails()
      .subscribe((data: any) => {
        console.log(data);
        this.bankDetails = data.data.bankDetail;
        console.log("har har mahadev", this.bankDetails);
      }, err => {
        console.log(err);
      })
  }

  selectBank(){
   this.selectedBank = $('input[name="radio-group"]:checked').val();
  //  var checked = document.querySelector('[name="checkButton"]:checked');
  // let checked = $('input[name="checkButton"]:checked').val();
  // let checked = $('#box1').val();
  //  console.log(checked)
   console.log(this.selectedBank);

  }



  /**
   * @param {String} form
   * validation of bankName with proper error message 
   */
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

  /**
   * @param {String} form
   * validation of accountNumber with proper error message 
   */
  validateAccountNumber(form) {

    console.log(form);
    const accountNumber = /[0-9]/;
    let message = document.getElementById('message2');
    if (!form.accountNumber.match(accountNumber)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";
    }
  }

  /**
   * @param {String} form
   * validation of IFSC Code with proper error message 
   */
  validateIFSCCode(form) {
    console.log(form);
    const phoneno = /[0-9]/;
    let message = document.getElementById('message3');
    if (!form.IFSCCode.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";

    }
  }
}