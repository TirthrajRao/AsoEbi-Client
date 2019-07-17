import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  eventCount;
  usersCount;
  constructor(private route: ActivatedRoute,
    private router: Router,private _eventService: EventService) { 
    
  }

  ngOnInit() {
    this.getEventCount();
    this.getUsersCount();
  }


  getEventCount(){
    this._eventService.eventCount()
    .subscribe((data:any)=>{
      console.log(data)
      this.eventCount = data.data.eventCount;
      console.log(this.eventCount);
    }, err=>{
      console.log(err);
    })
  }
  getUsersCount(){
    this._eventService.userCount()
    .subscribe((data:any)=>{
      console.log(data);
      this.usersCount = data.data.userCount
    },err=>{
      console.log(err);
    })
  }

}
