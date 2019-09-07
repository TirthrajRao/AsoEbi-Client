import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
import { AlertService } from '../services/alert.service';
import loadjs from 'loadjs';

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {

  path = config.baseMediaUrl;
  searchText;
  searchEvent: any = [];
  publicEvents: any = [];
  isDiable: false;
  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService) {
  }
  
  ngOnInit() {
    loadjs('assets/js/custom.js');
    this.getPublicEvents();
  }

  /**
   * @param {String} eventTheme
   *Background image of event   
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  /**
   * @param {String} searchText
   * On key search of public event 
   */
  onKey(searchText) {
    console.log(searchText);
    this._eventService.getPublicEvents(searchText)
      .subscribe(data => {
        console.log(data);
        this.searchEvent = data;
        console.log(this.searchEvent)
        this.publicEvents = this.searchEvent.data;
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * Get all public events with basic details of event
   */
  getPublicEvents() {
    this._eventService.getPublicEvents()
      .subscribe((data: any) => {
        console.log("data of public event", data);
        this.publicEvents = data.data;
        console.log("this.publicEvents", this.publicEvents);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * Redirect to login page
   */
  login() {
    this.router.navigate(['/login']);
  }
}
