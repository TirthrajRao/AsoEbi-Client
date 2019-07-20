import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
import { ClipboardService } from 'ngx-clipboard';


@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  private sub: any;
  private eventId: any;
  allDetailsofEvent = [];
  activityArray: any = [];
  groupArray: any;
  myEvent;
  path = config.baseMediaUrl;
  isDisable = false;
  visible = false;
  eventLink;
  isCelebrant = JSON.parse(localStorage.getItem('isCelebrant'));


  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private _clipboardService: ClipboardService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.viewDetailsOfEvent(this.eventId);
    })
  }

  ngOnInit() {
  }

  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }



  viewDetailsOfEvent(eventId) {
    this._eventService.getEventDetails(eventId)
      .subscribe((data: any) => {
        console.log("response of details event", data);
        this.allDetailsofEvent.push(data.data);
        console.log("response store in variable", this.allDetailsofEvent);
        this.eventLink = data.data.eventLink;
        console.log(this.eventLink);
        this.activityArray = data.data.activity;
        console.log(this.activityArray);
        // this.groupArray=this.activityArray.group;
        // console.log(this.groupArray);
      }, err => {
        console.log(err);
      })
  }

  editEventDeatils(id) {
    console.log(id);
    this.router.navigate(['/home/editEvent/', id])

  }
  deleteEvent(eventid) {
    console.log(eventid);
    this._eventService.deleteEvent(eventid).subscribe(data => {
      console.log("delete event response", data);
      this.router.navigate(['home/myEvent'])
    }, err => {
      console.log(err);
    })
  }
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

  addToCart(groupId, activityId, eventId, item, gender) {
    console.log({ groupId, activityId, eventId, item, gender });
    this.isDisable = true;
    this._eventService.addToCart(groupId, activityId, eventId, item, gender)
      .subscribe((data: any) => {
        this.isDisable = false;
        console.log(data);
      }, err => {
        console.log(err);
      })
  }

  myCart(id) {
    console.log("event id", id)
    this.router.navigate(['home/my-cart/', id]);
  }


  copy(text: string) {
    this._clipboardService.copyFromContent(text);
  }

}
