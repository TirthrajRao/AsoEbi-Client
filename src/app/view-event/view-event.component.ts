import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
import { ClipboardService } from 'ngx-clipboard';
import { AlertService } from '../services/alert.service';
import loadjs from 'loadjs';
declare var $: any;


// import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
// import '~@ngx-share/button/themes/default/default-theme';


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
  isJoined;
  url = this.eventLink;
  // fbIcon = faFacebookSquare;

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertService: AlertService, private _clipboardService: ClipboardService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.viewDetailsOfEvent(this.eventId);
    })
  }
  ngOnInit() {
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    setTimeout(() => {
      // activity slider
      $('.activity_slider').not('.slick-initialized').slick({
        dots: false,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        infinite: false,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
        responsive: [
          {
            breakpoint: 451,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
      // gender slider
      $('.gender_slider1').not('.slick-initialized').slick({
        // autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
        slidesToShow: 1.5,
        slidesToScroll: 1,
        draggable: true,
        fade: false,
        responsive: [
          {
            breakpoint: 451,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }, 300)
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
    // this.isDisable = true;
    this._eventService.getEventDetails(eventId)
      .subscribe((data: any) => {
        console.log("response of details event", data);
        this.allDetailsofEvent.push(data.data);
        this.isCelebrant = data.data.isCelebrant;
        console.log(this.isCelebrant);
        this.isJoined = data.data.isJoined;
        console.log(this.isJoined);
        if (data.data.isJoined == true) {
          this.isDisable = true;
        } else {
          this.isDisable = false;
        }
        // console.log("response store in variable", this.allDetailsofEvent);
        this.eventLink = data.data.eventLink;
        console.log(this.eventLink);
        this.activityArray = data.data.activity;
        console.log(this.activityArray);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  // getLink(){
  //   return this.eventLink;
  // }

  joinNow(id) {
    console.log("after login send event id", id);
    this._eventService.joinEvent(id)
      .subscribe((data: any) => {
        console.log("join event done", data);
        this.isDisable = true;
        this.alertService.getSuccess(data.message)
        this.router.navigate(['/home/view-event/', id])
      }, err => {
        console.log(err);
        this.alertService.getError(err.error.message);
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
  addToCart(eventId, itemId) {
    console.log({ eventId, itemId });
    this.isDisable = true;
    this._eventService.addToCart(eventId, itemId)
      .subscribe((data: any) => {
        this.isDisable = false;
        console.log(data);
        this.alertService.getSuccess(data.message)
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

  totalCollection(id) {
    console.log("event id", id);
    this.router.navigate(['home/collection/', id]);
  }

}
