import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';

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
  constructor(private route: ActivatedRoute,
    private router: Router,private _eventService: EventService) { }

  ngOnInit() {

    this.getPublicEvents();
  }


  getSrc(eventTheme) {
    return `url(`+this.path+eventTheme+`)`;
  }

  onKey(searchText){
    console.log(searchText);
    this._eventService.getPublicEvents(searchText)
    .subscribe(data=>{
      console.log(data);
      this.searchEvent = data;
      console.log(this.searchEvent)
      this.publicEvents = this.searchEvent.data;
    },err=>{
      console.log(err);
    })
  }

  getPublicEvents(){
    this._eventService.getPublicEvents()
    .subscribe((data:any)=>{
      console.log("data of public event", data);
      this.publicEvents = data.data;
      console.log("this.publicEvents", this.publicEvents);
    }, err=>{
      console.log(err);
    })
  }

  login(){
    this.router.navigate(['/login']);
  }
}
