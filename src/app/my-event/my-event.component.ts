import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  singleEventId;
  themePhoto: any = [];
  singleEventDetails: any;
  activityName: any;
  selectedActivity: any;
  selectedActivityGroup: any = [];
  itemNamePrint: any = [];
  eventHashtag;
  eventId;
  maleItem;
  feMaleItem;
  selectedGroup;
  selectedGender;
  userName = JSON.parse(localStorage.getItem('userName'));
  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService,
    private _loginService: LoginService, private change: ChangeDetectorRef) {
    this.ngOnInit()
  }

  // componentDidMount() {
  // }

  ngAfterViewChecked() {
    this.initActivitySlider();
  }
  ngOnInit() {
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    // this.showMenu();

    // $('.collect_detail')[0].slick.refresh();

    $('input:radio[name="radio-group1"]').on('change', (e) => {
      this.selectedGender = e.target.value;
      console.log(this.selectedGender);
      console.log(this.selectedActivityGroup)
      let item = _.filter(this.selectedActivityGroup, { groupName: this.selectedGroup });
      console.log(item);
      this.itemNamePrint = _.filter(item[0].item, { 'itemGender': this.selectedGender });
      console.log(this.itemNamePrint)
    })
    this.getMyEvents();
    // this.initCollectDetailSlick();
    // this.initActivitySlider();
    $(window).on('resize', this.initActivitySlider());
    setTimeout(() => {
      // $('.event_slider1')[0].slick.refresh();
    }, 100)
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

  getClassNameOfSection() {
    let className = $('#dynamic_loader_content > div:visible').attr('class');
    if (className === 'firstStep') {
      return 'eventA_page_section';
    } else if (className === 'secondStep') {
      return 'eventB_page_section';
    } else if (className === 'thirdStep') {
      return 'eventC_page_section';
    } else if (className === 'fourthStep') {
      return 'eventD_page_section';
    } else if (className === 'fifthStep') {
      return 'eventE_page_section';
    } else if (className === 'sixthStep') {
      return 'eventF_page_section';
    } else {
      return "";
    }
  }

  getClassNameOfDiv() {
    let className = $('#dynamic_loader_content > div:visible').attr('class');
    if (className === 'firstStep') {
      return 'eventA_sec1';
    } else if (className === 'secondStep') {
      return 'eventB_sec1';
    } else if (className === 'thirdStep') {
      return 'eventC_sec1';
    } else if (className === 'fourthStep') {
      return 'eventD_sec1';
    } else if (className === 'fifthStep') {
      return 'eventE_sec1';
    } else if (className === 'sixthStep') {
      return 'eventF_sec1';
    } else {
      return "";
    }
  }

  getSourceOfImage() {
    let className = $('#dynamic_loader_content > div:visible').attr('class');
    if (className === 'firstStep') {
      return '/assets/images/eventA_icon.png';
    } else if (className === 'secondStep') {
      return '/assets/images/eventB_icon.png';
    } else if (className === 'thirdStep') {
      return '/assets/images/eventC_icon.png';
    } else if (className === 'fourthStep') {
      return '/assets/images/eventD_icon.png';
    } else if (className === 'fifthStep') {
      return '/assets/images/eventE_icon.png';
    } else if (className === 'sixthStep') {
      return '/assets/images/eventF_icon.png';
    } else {
      return "";
    }
  }

  getClassNameOfText() {
    let className = $('#dynamic_loader_content > div:visible').attr('class');
    if (className === 'firstStep') {
      return 'new_event_black';
    } else if (className === 'fifthStep') {
      return 'hidden';
    } else {
      return "text-white";
    }
  }

  getClassNameOfHeading() {
    let className = $('#dynamic_loader_content > div:visible').attr('class');
    if (className === 'firstStep' || className === 'fifthStep') {
      return 'text-black';
    } else {
      return "text-white";
    }
  }

  ngOnViweChecked() {
    this.change.detectChanges();
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
    console.log(id);
    this.router.navigate(['/home/myEventDetails/', id])
    // let className = $('#dynamic_loader_content > div:visible').attr('class');
    // this._eventService.getEventDetails(id)
    //   .subscribe((data: any) => {
    //     // $('.event_slider1').slidesToShow()
    //     this.singleEventDetails = data.data;
    //     this.eventHashtag = this.singleEventDetails.hashTag;
    //     this.eventId = this.singleEventDetails._id;
    //     console.log("this.singlevebtdetailssssssssss", this.singleEventDetails);
    //     this.activityName = [];
    //     this.activityName = this.singleEventDetails.activity;
    //     console.log("data of single event ", this.activityName);
    //     if (!this.change['destroyed']) {
    //       this.change.detectChanges();
    //     }
    //     if (className !== 'secondStep') {
    //       $('.firstStep').css({ 'display': 'none' })
    //       $('.secondStep').css({ 'display': 'block' });
    //       setTimeout(() => {
    //         this.initCollectDetailSlick();
    //         // $('.collect_detail')[0].slick.refresh();
    //       }, 20);
    //     }
    //     if (goto && from) {
    //       this.nextSection(goto, from)
    //     }
    //   }, err => {
    //     console.log(err);
    //   })
  }
  // ngOnDestroy() {
  //   this.change.detach();
  // }

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
          prevArrow: '<button class="slick-next slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
          nextArrow: '<button class="slick-prev slick-arrow" ><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
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


  activityDetails(item, goto, from) {
    console.log(item);
    this.selectedActivity = item;
    this.selectedActivityGroup = item.group;
    this.selectedGroup = item.group[0].groupName;
    this.selectedGender = 'male';
    this.itemNamePrint = [];
    console.log("thisbjfdkjnkjdfdjfg", this.selectedActivityGroup)
    this.itemNamePrint.push(this.selectedActivityGroup[0].item[0]);
    // _.forEach(this.selectedActivityGroup, (item) => {
    //   console.log("item------------------------------------",item);
    //   _.forEach(item.item, (itemName) => {
    //     console.log("itemName------------------------------------",itemName);
    //     this.itemNamePrint.push(itemName);
    //   })
    // })
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
  // ThankYouMessage(id) {
  //   console.log("thank you message event id", id);
  //   this.router.navigate(['/home/thank-you', id])
  // }
  totalCollection(id) {
    console.log("event id", id);
    this.router.navigate(['home/collection/', id]);
  }


  nextSection(goto, from) {
    console.log(goto, from)
    // setTimeout(() => {
    $('.' + goto).css({ 'display': 'block' });
    $('.' + from).css({ 'display': 'none' })
    this.initCollectDetailSlick()
    // }, 200)
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
    this._eventService.deleteEvent(eventid).subscribe((data: any) => {
      console.log("delete event response", data);
      this.alertService.getSuccess(data.data.message)
      this.router.navigate(['home/myEvent'])
    }, (err: any) => {
      console.log(err);
      this.alertService.getError(err.message);
    })
  }
  handleChange(item) {
    console.log("item of single event ", item);
    this.selectedGroup = item.groupName;
    this.selectedGender = 'male';
    $('input:radio[id="test"]').prop('checked', true);
    // this.selectedActivity = item;
    // this.selectedActivityGroup = item.group;
    // this.itemNamePrint = [];
    // console.log("thisbjfdkjnkjdfdjfg", this.selectedActivityGroup)
    this.itemNamePrint = _.filter(item.item, { 'itemGender': this.selectedGender });
  }


}




