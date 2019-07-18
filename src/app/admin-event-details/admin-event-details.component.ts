import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import {config} from '../config';

@Component({
  selector: 'app-admin-event-details',
  templateUrl: './admin-event-details.component.html',
  styleUrls: ['./admin-event-details.component.css']
})
export class AdminEventDetailsComponent implements OnInit {

  private sub: any;
  private eventId: any;
  path = config.baseMediaUrl;
  allEventDetails: any;
  guestList: any = [];
  guestListWithPayment: any = [];

  constructor(private route: ActivatedRoute,
    private router: Router,private _eventService: EventService) {
      this.sub = this.route.params.subscribe(params=>{
        this.eventId = params.id;
        console.log(this.eventId);
        this.adminEventDetails(this.eventId);
      })
     }

  ngOnInit() {
  }
  getSrc(eventTheme) {
    return `url(`+this.path+eventTheme+`)`;
  }


  adminEventDetails(eventId){
    console.log(eventId);
    this._eventService.adminEventDetails(eventId)
    .subscribe((data:any)=>{
      console.log("response of admin event details", data);
      this.allEventDetails = data.data;
      console.log(this.allEventDetails);
      this.guestList = data.data.guestDetail;
      console.log("guest list ", this.guestList);
      this.guestListWithPayment = data.data.guestListWithPayment;
      console.log("payment list", this.guestListWithPayment);
    }, err=>{
      console.log(err);
    })
  }

}
