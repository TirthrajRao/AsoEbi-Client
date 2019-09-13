import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
import * as _ from 'lodash';
import { config } from '../config';
declare var $: any;


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private sub: any;
  private eventId: any;
  finalCartDetails: any = 0;
  grandTotal = 0;
  eventDetails;
  subTotal;
  finalGrandTotal;
  myCart;
  path = config.baseMediaUrl;
  donationAmount = JSON.parse(localStorage.getItem('donationAmount'));
  donation: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.finalPaymentDetails(this.eventId);
    })
  }

  ngOnInit() {
    console.log(this.donationAmount);

    

    function setInputFilter(textbox, inputFilter) {
      ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          }
        });
      });
    }

    setInputFilter(document.getElementById("uintTextBox"), function(value) {
      return /^-?\d*[.,]?\d{0,2}$/.test(value); });
    }
  /**
   * @param eventId 
   * get event items details with it's price and quantity and subtotal of all items 
   */
  finalPaymentDetails(eventId) {
    this._eventService.finalPaymentDetails(eventId)
      .subscribe((data: any) => {
        setTimeout(() => {
          this.initMainSlider();
        }, 10)
        this.eventDetails = data.data.eventDetail;
        console.log("last all payment details", this.eventDetails);
        this.finalCartDetails = data.data.cartItem;
        console.log(this.finalCartDetails);
        _.forEach(this.finalCartDetails, (Item: any) => {
          this.subTotal = Item.itemPrice * Item.quantity;
          this.grandTotal = this.grandTotal + this.subTotal;
          this.finalGrandTotal = this.grandTotal;
        })
        console.log(this.finalCartDetails);

      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param event
   * If donation amount added to cart, that amount added automatically on final total of cart 
   */
  finalTotal(event) {
    console.log(event);
    this.finalGrandTotal = this.grandTotal + + event;
    console.log(this.finalGrandTotal);
  }

  /**
   * @param data 
   * @param total 
   * @param donation 
   * @param address
   * Total amount,total items which buy,address of user for delivery,if donation added with bought items 
   */

  finalPayment(data, total, donation) {
    console.log(data, total, donation);
    this.myCart = {
      orderDetails: this.finalCartDetails,
      finalTotal: this.finalGrandTotal,
      eventId: this.eventId,
      donationAmount: donation,
      // addressFinal: address
    }
    console.log("mycartsssssssssssssss", this.myCart);
    this._eventService.makeFinalPayment(this.myCart)
      .subscribe((data: any) => {
        console.log("final response of carts", data);
        this.alertService.getSuccess(data.message)
        this.router.navigate(['/home/view-event/', this.eventId])
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
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

  nextSection(goto, from) {
    console.log(goto, from)
    // document.getElementById("uintTextBox").value() == null
    setTimeout(() => {
      $('.' + goto).css({ 'display': 'block' });
      $('.' + from).css({ 'display': 'none' })

      if ($('.event_detail_slider').hasClass('slick-initialized'))
      $('.event_detail_slider').slick('unslick');

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
    }, 20)
  }


}
