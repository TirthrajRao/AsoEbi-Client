import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  path = config.baseMediaUrl;
  myEvent;
  themePhoto: any = [];

  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService) { }

  ngOnInit() {
    this.getMyEvents();
  }

  /**
   * @param eventTheme 
   * Display backgorund of any event 
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  /**
   * To get all created events with it's details   
   */
  getMyEvents() {
    this._eventService.getMyevents()
      .subscribe((data: any) => {
        console.log("get my all events ", data);
        this.myEvent = data.data;
        console.log("my events details", this.myEvent);
        this.themePhoto = data.eventTheme;
        console.log(this.themePhoto);
      }, err => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /** 
   * @param {String} id eventId
   * navigate from this page to that particular event details page
   */
  viewMoreDeatils(id) {
    console.log("kai mde che ke nai", id);
    this.router.navigate(['/home/view-event/', id])
  }

  /**
   * @param {String} id eventId
   * Naviagte from this page to thank you messeage page of that event 
   */
  ThankYouMessage(id) {
    console.log("thank you message event id", id);
    this.router.navigate(['/home/thank-you', id])
  }

}
