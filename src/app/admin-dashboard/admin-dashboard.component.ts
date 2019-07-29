import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  eventCount;
  usersCount;
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertSerivce: AlertService) {
  }

  ngOnInit() {
    this.getEventCount();
  }

  /**
   * To get total no of counts of events,users,amount
   */
  getEventCount() {
    this._eventService.dashBoardCount()
      .subscribe((data: any) => {
        console.log(data)
        this.eventCount = data.data;
        console.log(this.eventCount);
      }, (err: any) => {
        console.log(err);
        this.alertSerivce.getError(err.message);
      })
  }
}
