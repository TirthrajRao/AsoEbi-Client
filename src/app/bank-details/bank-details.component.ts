import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
import { EventService } from '../services/event.service';
import Swal from 'sweetalert2';

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
  eventDetails;
  isLoad = false;
  private sub: any;
  public eventId: any;
  userName = JSON.parse(sessionStorage.getItem('userName'));
  manualLoginUser = JSON.parse(sessionStorage.getItem('currentUser'));
  
  constructor(private router: Router, private route: ActivatedRoute, private _loginService: LoginService, private _eventService: EventService, private _alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.singleEventDetails(this.eventId);
    })
  }

  ngOnInit() {
    this.isDisable = false;

    // menu toggle start
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    // menu toggle end

    /*bank detail slider end*/

    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.min(16)]),
      // IFSCCode: new FormControl('', [Validators.required, Validators.minLength(9), Validators.min(9)])
    })
    this.getBankDetails();

    // this.bankDetailsSlider()

  }

  singleEventDetails(id) {
    this._eventService.getEventDetails(id)
      .subscribe((data: any) => {
        console.log(data);
        this.eventDetails = data.data;
      }, err => {
        console.log(err);
      })
  }

  /**
   * Display error message
   */
  get f() { return this.bankDetailsForm.controls; }

  /**
   * @param {json} data
   * Add bank account details of user
   */
  onSubmit() {
    this.isLoad = true;
    console.log(this.bankDetailsForm);
    // this.isDisable = true;
    this.submitted = true;
    if (this.bankDetailsForm.invalid) {
      return;
    }

    this._loginService.addBankDetails(this.bankDetailsForm.value)
      .subscribe((data: any) => {
        setTimeout(() => {
          console.log("====================== CALLED ============================");

          this.getBankDetails();
          $('.bank_details_slider').not('.slick-initialized').slick({
            dots: false,
            slidesToShow: 1.5,
            slidesToScroll: 1,
            draggable: true,
            arrows: true,
            prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
            ]
          });
          console.log("data of bank details", data);
          this._alertService.getSuccess(data.message)
          // this.bankDetailsForm.reset();
          $('.firstStep').css({ 'display': 'none' })
          $('.secondStep').css({ 'display': 'block' });
          this.bankDetailsForm.reset();
          this.isLoad = false;
          this.isDisable = false;
        }, 100);
      }, (err: any) => {
        this.isLoad = false;
        console.log(err);
        this.isDisable = false;
        this._alertService.getError(err.message);
      })

  }

  getBankDetails() {
    this.isLoad = true;
    this._eventService.getBankDetails()
      .subscribe((data: any) => {
        console.log(data);
        // if(this.bankDetails){
        this.bankDetails = data.data.bankDetail;
        // }
        console.log("har har mahadev", this.bankDetails);
        setTimeout(() => {
          if ($('.bank_details_slider').hasClass('slick-initialized'))
            $('.bank_details_slider').slick('unslick');
          $('.bank_details_slider').not('.slick-initialized').slick({
            dots: false,
            slidesToShow: 1.5,
            slidesToScroll: 1,
            draggable: true,
            arrows: true,
            prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
            nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
            responsive: [
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
            ]
          });
        }, 100)
        this.isLoad = false;
      }, err => {
        this.isLoad = false;
        console.log(err);
      })
  }

  initSlider() {


  }

  selectBank() {
    this.isLoad = true;
    this.selectedBank = $('input[name="radio-group"]:checked').val();
    let checked = $('input[name="checkButton"]:checked').val();

    if (checked == 'direct' && checked == 'indirect') {
      Swal.fire({
        type: 'error',
        title: "sorry" + "You Can Select Only One Item",
        showConfirmButton: false,
        timer: 2000
      })
    }
    else {
      console.log(this.selectedBank);
      console.log(checked);
    }
    const body = {
      accountId: this.selectedBank,
      paymentType: checked,
      eventId: this.eventId
    }
    this._eventService.selectBankAccount(body)
      .subscribe((data: any) => {
        console.log(data);
        this.isLoad = false;
        this._alertService.getSuccess(data.message);
        this.router.navigate(['/home/myEventDetails/', this.eventId])
      }, err => {
        this.isLoad = false;
        console.log(err)
      })
  }

  addBankAccount() {
    this.bankDetailsForm.reset()
    $('.secondStep').css({ 'display': 'none' })
    $('.firstStep').css({ 'display': 'block' });
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
  // validateAccountNumber(form) {
  //   this.isDisable = true;
  //   console.log(form);
  //   const accountNumber = !/[^a-zA-Z0-9]/;
  //   let message = document.getElementById('message2');
  //   if (!form.accountNumber.match(accountNumber)){
  //     message.innerHTML = "";
  //     this.isDisable = false;
  //   }
  //   else {

  //     message.innerHTML = "Please enter only numbers"
  //     this.isDisable = true;
  //     console.log("message==========", message.innerHTML)
  //   }
  // }

  // validateAccountNumber(form) {
  //   console.log(form);
  //   const accountNumber = /[0-9]/;
  //   let message = document.getElementById('message2');
  //   if (!form.accountNumber.match(accountNumber)) {
  //     console.log("message==========", message)
  //     message.innerHTML = "Please enter only numbers"
  //     this.isDisable = true;
  //   } else {
  //     this.isDisable = false
  //     message.innerHTML = "";
  //   }
  // }

  getValidation(form){
    console.log(form)
    var field1 = (<HTMLInputElement>document.getElementById("accountNumber")).value;
    let message = document.getElementById('message2');
    console.log(field1);
    if(/[a-zA-Z]/g.test(field1)){
      message.innerHTML = "Please enter only numbers"
    }
    else if(!(/[0-9]{16}/.test(field1))){
      this.isDisable = true;
      console.log("Please enter valid number");
      if(field1.length < 16){
        message.innerHTML = "Please enter 16 digit number";
      }
    }else{
      message.innerHTML = ""
      this.isDisable = false;
      console.log("Valid entry");
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

  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
}