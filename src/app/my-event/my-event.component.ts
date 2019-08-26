import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { AlertService } from '../services/alert.service';
import { LoginService } from '../services/login.service';
import * as _ from 'lodash';
declare let $: any;


@Component({
  selector: 'app-my-event',
  templateUrl: './my-event.component.html',
  styleUrls: ['./my-event.component.css']
})
export class MyEventComponent implements OnInit {
  path = config.baseMediaUrl;
  myEvent;
  themePhoto: any = [];
  singleEventDetails: any;
  activityName: any;
  selectedActivity: any;
  selectedActivityGroup: any = [];
  itemNamePrint: any = [];
  eventHashtag;
  eventId
  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService, private _loginService: LoginService) {
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
  }

  componentDidMount() {
    console.log("hello");
    const script = document.createElement('script');
    script.src = '../assets/js/custom.js';
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);
  }
  ngOnInit() {
    // this.showMenu();



    this.getMyEvents();
    // this.initCollectDetailSlick();
    setTimeout(() => {
      this.initActivitySlider();
      $(window).on('resize', this.initActivitySlider());
      $('.event_slider1')[0].slick.refresh();
    }, 100)
    // function createSlick() {
    //   setTimeout(() => {
    //     $('.event_slider1').not('.slick-initialized').slick({
    //       infinite: true,
    //       slidesToShow: 2.5,
    //       slidesToScroll: 1,
    //       autoplay: false,
    //       arrows: false,
    //       prevArrow: '<button class="prevarrow text-center"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
    //       nextArrow: '<button class="nextarrow text-center"><i class="fa fa-caret-right" aria-hidden="true"></i></button>',
    //       responsive: [
    //         {
    //           breakpoint: 1024,
    //           settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 1,
    //             infinite: true,
    //           }
    //         },
    //         {
    //           breakpoint: 600,
    //           settings: {
    //             slidesToShow: 2,
    //             slidesToScroll: 1,
    //           }
    //         },
    //         {
    //           breakpoint: 480,
    //           settings: {
    //             slidesToShow: 1,
    //             slidesToScroll: 1
    //           }
    //         }
    //       ]

    //     });
    //   }, 100)
    // }

    // createSlick();
    // $(window).on('resize', createSlick);
    // $('.event_slider1')[0].slick.refresh();

  }


  /**
   * @param eventTheme 
   * Display backgorund of any event 
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  /**
   * To get all created events with it's details   
   */
  getMyEvents() {
    this._eventService.getMyevents()
      .subscribe((data: any) => {
        setTimeout(() => {
          this.initActivitySlider();
        }, 10)
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
   * @param {String} id eventId
   * navigate from this page to that particular event details page
   */
  viewMoreDeatils(id) {
    console.log("kai mde che ke nai", id);
    this.router.navigate(['/home/view-event/', id])
  }
  eventDeatils(id, goto, from) {
    this._eventService.getEventDetails(id)
      .subscribe(async (data: any) => {
        this.singleEventDetails = data.data;
        this.eventHashtag = this.singleEventDetails.hashTag;
        this.eventId = this.singleEventDetails._id;
        console.log("this.singlevebtdetailssssssssss", this.eventId);
        this.activityName = await this.singleEventDetails.activity;
        console.log("data of single event ", this.activityName);
        setTimeout(() => {
          $('.firstStep').css({ 'display': 'none' })
          $('.secondStep').css({ 'display': 'block' });
          this.initActivitySlider();
          this.initCollectDetailSlick();
        }, 200);
        if (goto && from) {
          this.nextSection(goto, from)
        }
      }, err => {
        console.log(err);
      })
  }

  initCollectDetailSlick() {
    $('.collect_detail').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      draggable: true,
      arrows: true,
      prevArrow: "<button type='button' class='prevarrow slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
      nextArrow: "<button type='button' class='nextarrow slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>",
      // asNavFor: '.activityClass',
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
  }

  initActivitySlider() {
    setTimeout(() => {
      $('.event_slider1').not('.slick-initialized').slick({
        infinite: true,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: false,
        prevArrow: '<button class="prevarrow text-center"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
        nextArrow: '<button class="nextarrow text-center"><i class="fa fa-caret-right" aria-hidden="true"></i></button>',
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
    }, 100)
  }
  activityDetails(item, goto, from) {
    console.log(item);
    this.selectedActivity = item;
    this.selectedActivityGroup = item.group;

    console.log("thisbjfdkjnkjdfdjfg", this.selectedActivityGroup)
    _.forEach(this.selectedActivityGroup, (item) => {
      _.forEach(item.item, (itemName) => {
        this.itemNamePrint.push(itemName);
      })
    })
    setTimeout(() => {
      this.initActivitySlider();
      this.initCollectDetailSlick();
    }, 100)
    if (goto && from) {
      this.nextSection(goto, from);
    }
  }

  /**
   * @param {String} id eventId
   * Naviagte from this page to thank you messeage page of that event 
   */
  ThankYouMessage(id) {
    console.log("thank you message event id", id);
    this.router.navigate(['/home/thank-you', id])
  }
  totalCollection(id) {
    console.log("event id", id);
    this.router.navigate(['home/collection/', id]);
  }


  nextSection(goto, from) {
    console.log(goto, from)
    setTimeout(() => {
      $('.' + goto).css({ 'display': 'block' });
      $('.' + from).css({ 'display': 'none' })
      this.initCollectDetailSlick()
    }, 200)
  }

  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
  editEvent(eventId, goto, from) {
    console.log(eventId);
    this.eventDeatils(eventId, goto, from);
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
    // this._eventService.deleteEvent(eventid).subscribe((data: any) => {
    //   console.log("delete event response", data);
    //   this.alertService.getSuccess(data.data.message)
    //   this.router.navigate(['home/myEvent'])
    // }, (err: any) => {
    //   console.log(err);
    //   this.alertService.getError(err.message);
    // })
  }
}




