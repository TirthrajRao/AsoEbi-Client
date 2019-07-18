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
  }


  getEventCount(){
    this._eventService.dashBoardCount()
    .subscribe((data:any)=>{
      console.log(data)
      this.eventCount = data.data;
      console.log(this.eventCount);
    }, err=>{
      console.log(err);
    })
  }

}
