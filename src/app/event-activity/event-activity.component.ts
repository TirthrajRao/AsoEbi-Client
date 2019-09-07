import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { Router, ActivatedRoute } from '@angular/router';
import { config } from '../config';
import { AlertService } from '../services/alert.service';
import { LoginService } from '../services/login.service';
import * as _ from 'lodash';
declare let $: any;

@Component({
  selector: 'app-event-activity',
  templateUrl: './event-activity.component.html',
  styleUrls: ['./event-activity.component.css']
})
export class EventActivityComponent implements OnInit {

  private sub: any;
  public eventId: any;
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
  activityId;
  allActivityList;
  isCelebrant;
  userName = JSON.parse(localStorage.getItem('userName'));
  constructor(private route: ActivatedRoute, private router: Router, private _eventService: EventService, private alertService: AlertService,
    private _loginService: LoginService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      this.activityId = params.id1;
      console.log("activity id", this.activityId);
      console.log("eventID=========", this.eventId);
      // this.activityDetails(this.activityId);
      this.eventDeatils(this.eventId, this.activityId);
    })
  }

  ngOnInit() {
    this.getMyEvents();
    setTimeout(() => {

      this.initActivitySlider();
      this.initCollectDetailSlick();
    }, 100)

    $('input:radio[name="radio-group1"]').on('change', (e) => {
      this.selectedGender = e.target.value;
      console.log(this.selectedGender);
      console.log(this.selectedActivityGroup)
      let item = _.filter(this.selectedActivityGroup, { groupName: this.selectedGroup });
      console.log(item);
      this.itemNamePrint = _.filter(item[0].item, { 'itemGender': this.selectedGender });
      console.log(this.itemNamePrint)
    })
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
          arrows: false,
          prevArrow: '<button class="prevarrow text-center"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="nextarrow text-center" ><i class="fa fa-caret-right" aria-hidden="true"></i></button>',
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

  activityDetails(item) {
    console.log(item);
    this.selectedActivity = item[0];
    this.selectedActivityGroup = item[0].group;
    this.selectedGroup = item[0].group[0].groupName;
    this.selectedGender = 'male';
    this.itemNamePrint = [];
    console.log("thisbjfdkjnkjdfdjfg", this.selectedActivityGroup)
    this.itemNamePrint.push(this.selectedActivityGroup[0].item[0]);
    setTimeout(() => {
      this.initActivitySlider();
      this.initCollectDetailSlick();
      // $('.collect_detail')[0].slick.refresh();
    }, 100)

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

  // singleEventDeatils(id, goto, from) {
  //   console.log(id);
  //   this.router.navigate(['/home/myEventDetails/', id])
  // }
  singleActivityDetails(activityId) {
    console.log(activityId);
    this.selectedActivity = activityId;
    this.selectedActivityGroup = activityId.group;
    this.selectedGroup = activityId.group[0].groupName;
    this.selectedGender = 'male';
    console.log(this.selectedGender)
    $('input:radio[id="test"]').prop('checked', true);
    this.itemNamePrint = _.filter(activityId.group[0].item, {itemGender: 'male'});
    // this.router.navigate(['/home/eventActivity/', eventId, activityId])
  }

  eventDeatils(id, activityId) {
    //   let className = $('#dynamic_loader_content > div:visible').attr('class');
    this._eventService.getEventDetails(id)
    .subscribe((data: any) => {
      this.isCelebrant = data.data.isCelebrant;
      console.log("single activity data",this.isCelebrant); 
        this.singleEventDetails = data.data;
        this.allActivityList = this.singleEventDetails.activity;
        console.log(this.allActivityList);
        this.eventHashtag = this.singleEventDetails.hashTag;
        this.eventId = this.singleEventDetails._id;
        // console.log("this.singlevebtdetailssssssssss", this.singleEventDetails);
        this.activityName = [];
        this.activityName = this.singleEventDetails.activity;
        this.activityName = this.activityName.filter(function (obj) {
          //console.log()
          if (obj._id == activityId) {
            return obj;
          }
        })
        console.log("data of single event ", this.activityName);
        this.activityDetails(this.activityName)
        setTimeout(() => {
          this.initActivitySlider();
          this.initCollectDetailSlick();
        }, 10);
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

  handleChange(item) {
    console.log("item of single event ", item);
    this.selectedGroup = item.groupName;
    this.selectedGender = 'male';
    console.log(this.selectedGender)
    $('input:radio[id="test"]').prop('checked', true);
    // this.selectedActivity = item;
    // this.selectedActivityGroup = item.group;
    // this.itemNamePrint = [];
    // console.log("thisbjfdkjnkjdfdjfg", this.selectedActivityGroup)
    this.itemNamePrint = _.filter(item.item, { 'itemGender': this.selectedGender });
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

  invitation(id){
    this.router.navigate(['/home/invitation/', id])
  }
  autoMessage(id){
    this.router.navigate(['/home/autoMessage/', id])
  }

}
