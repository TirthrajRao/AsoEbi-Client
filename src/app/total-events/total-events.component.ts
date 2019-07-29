import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
import { config } from '../config';

@Component({
  selector: 'app-total-events',
  templateUrl: './total-events.component.html',
  styleUrls: ['./total-events.component.css']
})

export class TotalEventsComponent implements OnInit {
  path = config.baseMediaUrl;
  totalEvent;
  themePhoto: any = [];
  isPaymentAccept: any = [];

  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService) { }

  ngOnInit() {

    /**
     * Get all events 
     */
    this.getAllEvents();
  }

  /**
   * @param {String} eventTheme
   * Display background image or gif 
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  /**
   * Get all created events 
   */
  getAllEvents() {
    this._eventService.allEventList()
      .subscribe((data: any) => {
        console.log(data);
        this.totalEvent = data.data;
        console.log(this.totalEvent);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {String} id
   * Get details of any particular event 
   */
  viewMoreDeatils(id) {
    console.log(id);
    this.router.navigate(['home/admin-eventDetails', id]);
  }

}
