import { Component, OnInit, ChangeDetectorRef, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
import { config } from '../config';
import * as _ from 'lodash';
declare let $: any;

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
  className = ["gray-bg", "blue-bg", "pink-bg"]
  @ViewChildren('allTheseThings') things: QueryList<any>;
  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {

    /**
     * Get all events 
     */
    this.getAllEvents();
    
  }

  ngAfterViewInit() {
    this.things.changes.subscribe(t => {
      this.ngForRendred();
    })
  }

  ngForRendred() {
    console.log('NgFor is Rendered');
    _.forEach(this.totalEvent, event => {
      // console.log(this.className[Math.floor(Math.random()*this.className.length)]);
      $('#'+event._id).addClass(this.className[Math.floor(Math.random()*this.className.length)]);
    })
  }

  /**
   * @param {String} eventTheme
   * Display background image or gif 
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  getClassNameOfSection(id){
    $('#'+id).addClass(this.className[Math.floor(Math.random()*this.className.length)]);
    // return this.className[Math.floor(Math.random()*this.className.length)];  
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
