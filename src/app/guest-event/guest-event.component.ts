import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
const Buffer = require('buffer/').Buffer;


@Component({
  selector: 'app-guest-event',
  templateUrl: './guest-event.component.html',
  styleUrls: ['./guest-event.component.css']
})
export class GuestEventComponent implements OnInit {


  private sub: any;
  private eventId: any;
  EventDetails: any = [];
  path = config.baseMediaUrl;
  themePhoto: any = [];
  newEventId;
  guestEventDetailsAfterLogin;
  idtoken = JSON.parse(localStorage.getItem('currentUser'));
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log("this.eventId", this.eventId);
    })
    this.newEventId = Buffer.from(this.eventId, 'base64').toString('ascii');
    console.log(this.newEventId)
    this.guestEventDetailsWithoutLogin(this.newEventId);
    this.guestEventDetailsWithLogin(this.eventId);
    localStorage.setItem('newEventId', JSON.stringify(this.newEventId));
  }

  ngOnInit() {
  }


  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }


  guestEventDetailsWithoutLogin(newEventId) {
    console.log("link generate id", newEventId)
    this._eventService.getEventDetails(newEventId)
      .subscribe((data: any) => {
        console.log("link event details", data);
        this.EventDetails = data.data;
        console.log("link event details", this.EventDetails);
      }, err => {
        console.log(err);
      })
  }

  guestEventDetailsWithLogin(eventId) {
    this._eventService.getEventDetails(eventId)
    .subscribe((data:any)=>{
      console.log("guest page display after login of guest", data);
      this.guestEventDetailsAfterLogin = data.data;
      console.log("fsdbgvsdbvsdbfgvbfvkksd", this.guestEventDetailsAfterLogin);
    }, err=>{
      console.log(err);
    })
  }

  joinNow() {
    const eventToken = JSON.parse(localStorage.getItem('newEventId'));
    console.log(eventToken);
    this._eventService.joinEvent(eventToken)
      .subscribe(data => {
        console.log("event done", data);
      }, err => {
        console.log(err);
      })
  }
  joinNowAfterLogin(id){
    console.log("after login send event id", id);
    this._eventService.joinEvent(id)
    .subscribe(data=>{
      console.log("join event done", data);
      this.router.navigate(['/home/view-event/', id])
    },err=>{
      console.log(err);
    })
  }
}
