import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
import { ClipboardService } from 'ngx-clipboard';
import { AlertService } from '../services/alert.service';

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
  isCelebrant;

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertService: AlertService, private _clipboardService: ClipboardService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.viewDetailsOfEvent(this.eventId);
    })
  }

  ngOnInit() {
  }

  /**
   * @param {String} eventTheme
   * Display event background image or gif 
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }


  /**
   * @param {String} eventId
   * Get any particular event details 
   */
  viewDetailsOfEvent(eventId) {
    this._eventService.getEventDetails(eventId)
      .subscribe((data: any) => {
        console.log("response of details event", data);
        this.allDetailsofEvent.push(data.data);
        this.isCelebrant = data.data.isCelebrant;
        console.log(this.isCelebrant);
        console.log("response store in variable", this.allDetailsofEvent);
        this.eventLink = data.data.eventLink;
        console.log(this.eventLink);
        this.activityArray = data.data.activity;
        console.log(this.activityArray);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {String} id
   * Redirect to edit event page 
   */
  editEventDeatils(id) {
    console.log(id);
    this.router.navigate(['/home/editEvent/', id])

  }
  /**
   * @param {String} eventid
   * Delete created event 
   */
  deleteEvent(eventid) {
    console.log(eventid);
    this._eventService.deleteEvent(eventid).subscribe((data: any) => {
      console.log("delete event response", data);
      this.alertService.getSuccess(data.data.message)
      this.router.navigate(['home/myEvent'])
    }, (err: any) => {
      console.log(err);
      this.alertService.getError(err.message);
    })
  }

  /**
   * Get all events of login user
   */
  getMyEvents() {
    this._eventService.getMyevents()
      .subscribe((data: any) => {
        console.log("get my all events ", data);
        this.myEvent = data.data;
        console.log("my events details", this.myEvent);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {String} groupId 
   * @param {String} activityId 
   * @param {String} eventId 
   * @param {Object} item 
   * @param {Key} gender
   * Items added to cart  
   */
  addToCart(groupId, activityId, eventId, item, gender) {
    console.log({ groupId, activityId, eventId, item, gender });
    this.isDisable = true;
    this._eventService.addToCart(groupId, activityId, eventId, item, gender)
      .subscribe((data: any) => {
        this.isDisable = false;
        console.log(data);
        this.alertService.getSuccess(data.data.message)
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {String} id
   * Display all added item of cart 
   */
  myCart(id) {
    console.log("event id", id)
    this.router.navigate(['home/my-cart/', id]);
  }

  /**
   * @param {String} text
   * For copy eventLink  
   */
  copy(text: string) {
    this._clipboardService.copyFromContent(text);
  }

}
