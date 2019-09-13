import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
// import { config } from '../config';
declare var $: any;
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {


  private sub: any;
  public eventId: any;
  singleEventDetails: any;
  eventHashtag;
  isLoad = false;
  userName = JSON.parse(localStorage.getItem('userName'));

  constructor(private route: ActivatedRoute, private router: Router,private _loginService: LoginService, private _eventService: EventService, private alertService: AlertService, ) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.eventDeatils(this.eventId);
    })
  }

  ngOnInit() {
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
  }


  eventDeatils(id) {
    this.isLoad = true;
    console.log(id);
    this._eventService.getEventDetails(id)
      .subscribe((data: any) => {
        this.singleEventDetails = data.data;
        this.eventHashtag = this.singleEventDetails.hashTag
        console.log("single event data", data);
      }, err => {
        this.isLoad = false;
        console.log(err);
      })
  }
  editEventDeatils(id) {
    console.log(id);
    this.router.navigate(['/home/editEvent/', id])
  }
  deleteEvent(eventid) {
    console.log(eventid);
    this._eventService.deleteEvent(eventid).subscribe((data: any) => {
      console.log("delete event response", data);
      this.alertService.getSuccess(data.message)
      this.router.navigate(['home/myEvent'])
    }, (err: any) => {
      console.log(err);
      this.alertService.getError(err.message);
    })
  }
  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
}
