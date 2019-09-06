import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { AlertService } from '../services/alert.service';
import { LoginService } from '../services/login.service';
import * as _ from 'lodash';
declare let $: any;


@Component({
  selector: 'app-invitation-event',
  templateUrl: './invitation-event.component.html',
  styleUrls: ['./invitation-event.component.css']
})
export class InvitationEventComponent implements OnInit {
  private sub: any;
  private eventId: any;
  path = config.baseMediaUrl;
  myEvent;
  singleEventId;
  themePhoto: any = [];
  singleEventDetails: any;
  activityName: any;
  selectedActivity: any;
  selectedActivityGroup: any = [];
  itemNamePrint: any = [];
  eventHashtag;
  maleItem;
  feMaleItem;
  selectedGroup;
  selectedGender;
  EventLink;
  userName = JSON.parse(localStorage.getItem('userName'));
  constructor(private route: ActivatedRoute, private router: Router, private _eventService: EventService, private alertService: AlertService,
    private _loginService: LoginService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.eventDeatils(this.eventId);
    })
  }

  ngOnInit() {
    this.getMyEvents();
    this.initActivitySlider();
    this.initCollectDetailSlick();
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
  }

  initActivitySlider() {
    $(document).ready(function () {
      setTimeout(() => {
        // console.log("$('#custom_btn_next').trigger('click') done");
        // console.log($('.event_slider1').not('.slick-initialized'));
        $('.event_slider1').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 2.5,
          slidesToScroll: 1,
          autoplay: false,
          arrows: true,
          prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="slick-next slick-arrow" ><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
        // $('#custom_btn_next').trigger('click');
      }, 100);
    })
  }



  initCollectDetailSlick() {
    $(document).ready(function () {
      setTimeout(() => {
        $('.collect_detail').not('.slick-initialized').slick({
          infinite: true,
          slidesToShow: 6,
          slidesToScroll: 1,
          autoplay: false,
          draggable: true,
          arrows: true,
          prevArrow: "<button type='button' class='prevarrow slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
          nextArrow: "<button type='button' class='nextarrow slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 5,
                slidesToScroll: 1,
                infinite: true,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            }
          ]
        });
      }, 100)
    })
  }


  getMyEvents() {
    this._eventService.getMyevents()
      .subscribe((data: any) => {
        // setTimeout(() => {
        //   this.initActivitySlider();
        // }, 10)
        console.log("get my all events ", data);
        this.myEvent = data.data;
        console.log("my events details", this.myEvent);
        this.themePhoto = data.eventTheme;
        console.log(this.themePhoto);
      }, err => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
 * @param eventTheme 
 * Display backgorund of any event 
 */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  singleActivityDetails(eventId, activityId) {
    console.log(eventId, activityId);
    this.router.navigate(['/home/eventActivity/', eventId, activityId])
  }


  eventDeatils(id) {
    console.log(id);
    //   let className = $('#dynamic_loader_content > div:visible').attr('class');
    this._eventService.getEventDetails(id)
      .subscribe((data: any) => {
        this.singleEventDetails = data.data;
        this.eventHashtag = this.singleEventDetails.hashTag;
        this.EventLink = this.singleEventDetails.eventLink;
        this.eventId = this.singleEventDetails._id;
        console.log("this.singlevebtdetailssssssssss", this.singleEventDetails);
        this.activityName = [];
        this.activityName = this.singleEventDetails.activity;
        console.log("data of single event ", this.activityName);
        setTimeout(() => {
          this.initActivitySlider();
          this.initCollectDetailSlick();
        }, 100);
      }, err => {
        console.log(err);
      })
  }

  totalCollection(id) {
    console.log("event id", id);
    this.router.navigate(['home/collection/', id]);
  }

  /** 
   * @param {String} id eventId
   * navigate from this page to that particular event details page
   */
  viewMoreDeatils(id) {
    console.log("kai mde che ke nai", id);
    this.router.navigate(['/home/view-event/', id])
  }

  messageEvent(id) {
    this.router.navigate(['/home/eventMessage/', id])
  }
  autoMessage(id) {
    this.router.navigate(['/home/autoMessage/', id])
  }
  allEventList(id) {
    this.router.navigate(['/home/myEventDetails/', id])
  }

  nextSection(goto, from) {
    console.log(goto, from)
    $('.' + goto).css({ 'display': 'block' });
    $('.' + from).css({ 'display': 'none' })
  }
  editEventDeatils(id) {
    console.log(id);
    this.router.navigate(['/home/editEvent/', id])
  }
}
