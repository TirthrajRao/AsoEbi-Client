import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.css']
})
export class MyCartComponent implements OnInit {

  private sub: any;
  private eventId: any;
  cartDetails: any = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.myCartDetails(this.eventId);
    })
  }

  ngOnInit() {
  }

  /**
   * @param {} eventId 
   * get all addToCart items details with price and quantity 
   */
  myCartDetails(eventId) {
    console.log("event iddddddd", eventId);
    this._eventService.getProducts(eventId)
      .subscribe((data: any) => {
        console.log("card all detailsssss", data);
        this.cartDetails = data.data;
        console.log(this.cartDetails);
      }, err => {
        console.log(err);
      })
  }
  /**
   * @param id item._id pass
   * remove any add to cart item on my cart 
   */
  removeItem(id) {
    console.log("id of remove item ", id);
    this._eventService.removeCartItem(id)
      .subscribe(data => {
        console.log("remove item data", data);
        this.myCartDetails(this.eventId);
      }, err => {
        console.log(err);
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
      }, err => {
        console.log(err);
      })
  }

}
