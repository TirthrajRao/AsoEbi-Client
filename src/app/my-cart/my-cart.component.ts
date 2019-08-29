import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
declare var $: any;
import * as _ from 'lodash';
import { async } from 'q';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  donationForm: FormGroup;
  private sub: any;
  private eventId: any;
  cartDetails: any = [];
  eventDetails;
  allDetails;
  selectedGender;
  selectedGroup;
  firstGroupItem;
  itemNamePrint;
  subTotal;
  grandTotal = 0;
  finalGrandTotal;
  donationAmount;
  maleTotal;
  femaleTotal;
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.myCartDetails(this.eventId);
    })

    this.donationForm = new FormGroup({
      amount: new FormControl('')
    })
  }

  ngOnInit() {
    $('input:radio[name="radio-group"]').on('change', (e) => {
      this.selectedGender = e.target.value;
      console.log(this.selectedGender);
      console.log("haila", this.cartDetails)
      let item = _.filter(this.cartDetails, { groupName: this.selectedGroup });
      console.log(item);
      this.itemNamePrint = _.filter(item, { 'itemGender': this.selectedGender });
      console.log("he bhagvan", this.itemNamePrint)
    })
  }

  donation() {
    this.donationAmount = this.donationForm.value;
    console.log("donation amount", this.donationAmount);
    localStorage.setItem('donationAmount', JSON.stringify(this.donationAmount));
  }
  initMainSlider() {
    setTimeout(() => {
      $('.event_detail_slider').not('.slick-initialized').slick({
        // autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        draggable: true,
        fade: false,
        responsive: [
          {
            breakpoint: 1367,
            settings: {
              slidesToShow: 3.2
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2.7
            }
          }, {
            breakpoint: 575,
            settings: {
              slidesToShow: 1.5
            }
          }
        ]
      });
    }, 100)
  }

  initGroupSlider() {
    setTimeout(() => {
      $('.groupSlider').not('.slick-initialized').slick({
        // autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        draggable: true,
        fade: false,
        responsive: [
          {
            breakpoint: 1367,
            settings: {
              slidesToShow: 3.2
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: 2.7
            }
          }, {
            breakpoint: 575,
            settings: {
              slidesToShow: 1.5
            }
          }
        ]
      });
    }, 100)
  }



  /**
   * @param {String} eventId 
   * get all addToCart items details with price and quantity 
   */
  myCartDetails(eventId) {
    console.log("event iddddddd", eventId);
    this._eventService.getProducts(eventId)
      .subscribe(async (data: any) => {
        console.log("card all detailsssss", data);
        this.allDetails = data.data;
        this.eventDetails = data.data.eventDetail;
        this.cartDetails = await this.allDetails.cartList;
        _.forEach(this.cartDetails, (item) => {
          console.log(item);
          if (item.itemGender == 'male') {
            this.maleTotal = item.itemPrice;
          }
          if (item.itemGender == 'female') {
            this.femaleTotal = item.itemPrice;
          }
          console.log(this.femaleTotal);
          this.subTotal = item.itemPrice * item.quantity;
          this.grandTotal = this.grandTotal + this.subTotal
          this.finalGrandTotal = this.grandTotal;
        })
        console.log(this.cartDetails);
        setTimeout(() => {
          this.initMainSlider();
          this.initGroupSlider();
        }, 200)
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {String} id item._id pass
   * remove any add to cart item on my cart 
   */
  removeItem(id) {
    console.log("id of remove item ", id);
    this._eventService.removeCartItem(id)
      .subscribe(data => {
        console.log("remove item data", data);
        this.myCartDetails(this.eventId);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {JSON} data
   * proceed for final checkout  
   */
  allItem(data) {
    console.log(data);
    this._eventService.proceedToPay(data)
      .subscribe(data => {
        console.log("added cart item ", data);
        this.router.navigate(['home/payment/', this.eventId]);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  handleChange(item) {
    console.log(item);
    this.selectedGroup = item.groupName;
    this.selectedGender = 'male';
    $('input:radio[id="test1"]').prop('checked', true);
    this.itemNamePrint = _.filter(item, { 'itemGender': this.selectedGender });
  }

  finalTotal(item) {
    console.log(item);
    if (item.itemGender == 'male') {
      //  this.maleTotal = item.itemPrice;
      this.maleTotal = item.quantity * item.itemPrice;
      console.log(this.maleTotal)
    }
    
    if (item.itemGender == 'female') {
      //  this.femaleTotal = item.itemPrice;
      this.femaleTotal = item.quantity * item.itemPrice;
      console.log(this.femaleTotal)
    }
    this.finalGrandTotal = this.maleTotal + this.femaleTotal;
    console.log(this.finalGrandTotal);
  }

  nextSection(goto, from) {
    console.log(goto, from)
    setTimeout(() => {
      $('.' + goto).css({ 'display': 'block' });
      $('.' + from).css({ 'display': 'none' })
      this.initMainSlider();
    }, 200)
  }
}
