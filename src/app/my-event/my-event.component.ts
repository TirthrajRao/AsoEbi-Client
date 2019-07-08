import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import {config} from '../config'; 
import { from } from 'rxjs';
import { Config } from 'protractor';


@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  path = config.baseMediaUrl;
  myEvent;

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, ) { }

  ngOnInit() {
    this.getMyEvents();
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
      }, err => {
        console.log(err);
      })
  }


  viewMoreDeatils(id){
    console.log("kai mde che ke nai", id);
    this.router.navigate(['/home/view-event/',id])
  }


}
