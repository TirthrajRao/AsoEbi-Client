import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  private sub: any;
  private eventId: any;
  finalCartDetails: any;
  grandTotal = 0;
  subTotal;
  finalGrandTotal;
  myCart;

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.finalPaymentDetails(this.eventId);
    })
  }

  ngOnInit() {
  }

  /**
   * @param eventId 
   * get event items details with it's price and quantity and subtotal of all items 
   */
  finalPaymentDetails(eventId) {
    this._eventService.finalPaymentDetails(eventId)
      .subscribe((data: any) => {
        console.log("last all payment details", data);

        
        console.log(this.grandTotal);
        this.finalCartDetails = data.data.cartItem;
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

  finalPayment(data, total, donation, address) {
    console.log(data, total, donation);
    this.myCart = {
      orderDetails: this.finalCartDetails,
      finalTotal: this.finalGrandTotal,
      eventId: this.eventId,
      donationAmount: donation,
      addressFinal: address
    }
    console.log("mycartsssssssssssssss", this.myCart);
    this._eventService.makeFinalPayment(this.myCart)
      .subscribe((data: any) => {
        console.log("final response of carts", data);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

}
