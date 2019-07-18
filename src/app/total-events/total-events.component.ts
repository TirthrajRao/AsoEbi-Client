import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
import { constants } from 'os';


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
  constructor(private route: ActivatedRoute,
    private router: Router,private _eventService: EventService) { }

  ngOnInit() {
    this.getAllEvents();
  }


  getSrc(eventTheme) {
    return `url(`+this.path+eventTheme+`)`;
  }


  getAllEvents(){
    this._eventService.allEventList()
    .subscribe((data:any)=>{
      console.log(data);
      this.totalEvent = data.data;
      console.log(this.totalEvent);
    }, err=>{
      console.log(err);
    })
  }
  viewMoreDeatils(id){
    console.log(id);
    this.router.navigate(['admin-eventDetails',id]);
   
  }

}
