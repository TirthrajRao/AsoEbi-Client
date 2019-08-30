import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service';
import { AlertService } from '../services/alert.service';
declare var $: any;
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { config } from '../config';
import loadjs from 'loadjs';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})

export class CreateEventComponent implements OnInit {
  eventForm: FormGroup;
  activityForm: FormGroup;
  groupForm: FormGroup;
  files: Array<File> = [];
  themeFiles: Array<File> = [];
  eventId: any;
  createdActivity: any;
  isPublicVal = false;
  isLogistics = false;
  activityId;
  items;
  gArray;
  eventActivities: any = [];
  createdEventDetails
  selectedStartDate;
  selectedEndDate;
  paymentDeadlineDate;
  private sub: any;
  path = config.baseMediaUrl;
  activitiesDate: any = [];
  bankDetails: any = [];
  bankDetailsForm: FormGroup;
  isDisable = false;
  submitted = false;
  public imagePath;
  imgURL: any;
  colorSetting: any;
  changeColors: any;
  eventTypeValue;
  selectedActivityToAddGroup;
  constructor(private route: ActivatedRoute, private router: Router, private _eventService: EventService,
    private alertService: AlertService, private fb: FormBuilder, private _loginService: LoginService) {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.eventId = params.id;
        console.log(this.eventId);
        this.viewDetailsOfEvent(this.eventId);
      }
    })
    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      // startDate: new FormControl(''),
      // endDate: new FormControl(''),
      hashTag: new FormControl('', [Validators.required, Validators.minLength(4)]),
      profile: new FormControl(''),
      deadlineDate: new FormControl(''),
      isPublic: new FormControl(this.isPublicVal),
      isLogistics: new FormControl(this.isLogistics),
      background: new FormControl('')
    })

    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      // IFSCCode: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    })

    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });

  }

  ngOnInit() {

    // this.createdActivity = [
    //   {
    //     activityDate: null,
    //     activityName: "vbcnbnbv",
    //     createdAt: "2019-08-27T14:17:46.935Z",
    //     isDeleted: false,
    //     updatedAt: "2019-08-27T14:17:46.935Z",
    //     _id: "5d65fbd85a521a7f6075f691"
    //   }, {
    //     activityDate: null,
    //     activityName: "hdhfgh",
    //     createdAt: "2019-08-27T14:17:46.935Z",
    //     isDeleted: false,
    //     updatedAt: "2019-08-27T14:17:46.935Z",
    //     _id: "5d65fbd85a521a7f6075f690"
    //   }
    // ]
    this.getActivityFrom(),
      // this.initGroupForm(this.createdActivity);
      this.initGroupForm();
    // this.maleItemArray = []
    $('#eventId').css({ 'display': 'none' });
    $(function () {
      // $("#datepicker").datepicker();
      // $("#startDate").val(Date.now());
      // $("#startDate").datepicker({ dateFormat: 'yyyy-MM-dd' }).val();
    });


    $(document).ready(function () {
      // $("#startDate").datepicker({dateFormat: "yy-mm-dd"});

      // $("#startDate").datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });
    });

    // $("#register_steps_tab").accordion({
    //   heightStyle: "content"
    // });
    $('.next_step').click(function () {
      $('#register_steps_tab.ui-accordion .ui-accordion-header-active').next('.step_content').next('h3').trigger('click');
      $('#register_steps_tab.ui-accordion .ui-accordion-header-active').prev('.step_content').prev('h3').addClass('step_done');
    });
    $('.prev_step').click(function () {
      $('#register_steps_tab.ui-accordion .ui-accordion-header-active').prev('.step_content').prev('h3').trigger('click');
      $('#register_steps_tab.ui-accordion .ui-accordion-header-active').removeClass('step_done');
    });

    $('.dropdown-menu a').on('click', function () {
      $('.dropdown-toggle').html($(this).html());
    })
    this.getBankDetails();

    /* Filteration of profile photo */

    $("#color1").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'grayscale(100%)',
      });
    });

    $("#color2").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'sepia(100%)',
      });
    });

    $("#normal").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'none',
      });
    });

    $("#color3").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'contrast(100%)',
      });
    });

    $("#color4").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'brightness(3)',
      });
    });

    $("#color5").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'opacity(0.2)',
      });
    });

    $("#color6").click(function () {
      $("#imageFilter").css({
        '-webkit-filter': 'saturate(8)',
      });
    });


    // new event page slider start
    // setTimeout(()=> {
    var $slideContainter = $('.new_event_slider'),
      $slider = $slideContainter.slick({
        dots: true,
        infinite: false,
        speed: 1000,
        draggable: true,
        arrows: true,
        prevArrow: "<button type='button' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
        nextArrow: "<button type='button' class='slick-next pull-right' id='next_btn'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
        // autoplay:true
      });
    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      setTimeout(function () {
        var activeNow = $('.slick-dots li.slick-active').text();
        $('.slick-dots').removeClass('slide1');
        $('.slick-dots').removeClass('slide2');
        $('.slick-dots').removeClass('slide3');
        $('.slick-dots').removeClass('slide4');
        $('.slick-dots').removeClass('slide5');
        $('.slick-dots').removeClass('slide6');
        $('.slick-dots').removeClass('slide7');
        $('.slick-dots').removeClass('slide8');
        $('.slick-dots').removeClass('slide9');
        $('.slick-dots').removeClass('slide10');
        $('.slick-dots').removeClass('slide11');
        $('.slick-dots').removeClass('slide12');
        var className = ['slide1', 'slide2', 'slide3', 'slide4', 'slide5', 'slide6', 'slide7', 'slide8', 'slide9', 'slide10', 'slide11', 'slide12'];
        $('.slick-dots li').parent('.slick-dots').addClass(className[activeNow - 1]);
      }, 10);
    });

    let colorSetting = {
      section: ['#c1c3be', '#cdcdcd', '#e7e7e7', '#f7f7f7', '#f4f4f4', '#e1c2aa', '#e8e7e5', '#e7e7e7', '#93a8c1', '#e2e4e3', '#ebf0f1', '#d1d1d1'],
      prevArrow: ['#a4bf45', '#f73953', '#ef6439', '#f4ad48', '#fae545', '#f4c036', '#ffeb5b', '#f73953', '#bfa066', '#eaa52e', '#afda57', '#ffb54d'],
      headings: ['#1d73ae', '#f73953', '#ef6439', '#f4ad48', '#e32676', '#373255', '#371448', '#e91e3b', '#363f4f', '#eaa52e', '#1c424d', '#000000'],
    };
    var changeColors = function (slide) {
      console.log("color=========>", colorSetting.section[slide]);
      $('.event_slider_section').css({
        background: colorSetting.section[slide]
      }, 10);
      $('.new_event_slider button.slick-prev').css({
        color: colorSetting.prevArrow[slide]
      }, 10);
      $('.event_slider_section .aso_heading').css({
        color: colorSetting.headings[slide]
      }, 10);

    };
    $slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      changeColors(nextSlide);
    });
    changeColors(0);


    // }, 500);
    // new event page slider end

    $('#next_btn').on('click', () => {
      if(this.eventId){

        this.updateEvent($(this));
      }
      else{
        this.addEvent($(this));
      }
    })


    // DropDown Js
    $('.select_event_type li > a').click(function () {
      this.eventTypeValue = $(this).html();
      $('.selected_event_type > a').html(this.eventTypeValue);
      console.log("event selcet thai jaje ========", this.eventTypeValue);
      setControl(this.eventTypeValue);
    });
    var eventFormLocal = this.eventForm;
    var setControl = function (event) {
      console.log("event selcet thai jaje biji var ========", event);
      eventFormLocal.controls.eventType.setValue(event)
    }

  }



  /**
   * Error message of eventDetails 
   */
  get f() { return this.eventForm.controls }

  /**
   * Error message of bankDetails
   */
  get errorMessage() { return this.bankDetailsForm.controls; }
  /**
   * Create new event with it's details
   */

  addEvent($this) {
    console.log("data of event", $('.slick-active').hasClass("done"));
    if ($('.slick-active').hasClass("done")) {
      console.log("in twelve_slide");
      this._eventService.addEvent(this.eventForm.value, this.files, this.themeFiles)
        .subscribe((data: any) => {
          console.log("event details", data);
          $('.step_1').css({ 'display': 'none' })
          $('.step_2').css({ 'display': 'block' });
          this.eventId = data.data._id;
          console.log("created eventid", this.eventId);
          this.getActivityFrom();
        }, (err: any) => {
          console.log(err);
          this.alertService.getError(err.message);
        })
    }
    console.log("data of event", $('.slick-active').hasClass("twelve_slide"));
    if ($('.slick-active').hasClass("twelve_slide")) {
      $('.slick-active').addClass("done")
    }
  }

  /**
   * @param {String} event
   * To upload profile photo of event
   */
  addFile(event) {
    console.log("profile photo path", event);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
      this.files = event;
      var reader = new FileReader();
      this.imagePath = this.files;
      reader.readAsDataURL(this.files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }

    else {
      Swal.fire({
        title: 'Error',
        text: "You can upload only image",
        type: 'warning',
      })

    }
  }

  /**
   * @param {String} event
   * To upload background of event 
   */
  addThemePhoto(event) {
    console.log(event);
    _.forEach(event, (file: any) => {
      if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png" || file.type == "image/gif") {
        this.themeFiles.push(file);

      } else {
        Swal.fire({
          title: 'Error',
          text: "You can upload only image",
          type: 'warning',
        })
      }
    })
  }

  /**
   * @param {JSON} createdActivity
   * Edit event activities 
   */
  getActivityFrom(createdActivity?) {
    this.activityForm = new FormGroup({
      activity: this.fb.array(this.activityArray(createdActivity))
    })
  }

  /**
   * @param {String} activities
   *  To create new activity
   */
  activityArray(activities?: any[]) {
    console.log("activities", activities);
    if (!activities) {
      return [this.fb.group({
        activityName: new FormControl(''),
        activityDate: new FormControl(''),
        eventId: new FormControl(this.eventId)
      })]
    }
    /**
     * To edit created activities
     */
    let actArray = [];
    for (let i = 0; i < activities.length; i++) {
      actArray.push(this.fb.group({
        activityId: new FormControl(activities[i]._id),
        activityName: new FormControl(activities[i].activityName),
        activityDate: new FormControl(activities[i].activityDate.split("T")[0]),
        eventId: new FormControl(activities[i].eventId)
      }))
    }
    return actArray;
  }

  /**
   * @param {String} activity
   * To create new group in event or to edit created group of event 
   */
  initGroupForm(activity?) {
    this.groupForm = new FormGroup({
      eventId: new FormControl(activity ? activity[0].eventId : ""),
      group: this.fb.array(this.groupArray(activity, null))
    })
  }

  /**
   * @param {String} activities `
   * @param {String} activityId
   *  To create new group in event or to edit created group of event 
   */
  groupArray(activities?, activityId?) {
    console.log("new create group =======", activities, activityId);
    if (activityId) {
      return this.fb.group({
        activityId: new FormControl(activityId),
        groupName: new FormControl(''),
        male: this.fb.array([this.maleItemArray()]),
        female: this.fb.array([this.femaleItemArray()])
      });
    } else if (activities && activities.length) {
      this.gArray = [];
      for (let i = 0; i < 1; i++) {
        // console.log("i =", i , "details =", activities[i])
        if (activities[i].group) {
          for (let j = 0; j < 1; j++) {
            // console.log("j =", j , "inner details =", activities[i].group[j])
            this.gArray.push(this.fb.group({
              activityId: new FormControl(activities[i]._id),
              groupName: new FormControl(activities[i].group[j].groupName),
              male: this.fb.array([this.maleItemArray(activities[i].group[j].item[i])]),
              female: this.fb.array([this.femaleItemArray(activities[i].group[j].item[i])])
            }));
          }
          // return this.gArray;
        } else {
          this.selectedActivityToAddGroup = activities[i]._id;
          this.gArray.push(this.fb.group({
            activityId: new FormControl(activities[i]._id),
            groupName: new FormControl(''),
            male: this.fb.array([this.maleItemArray()]),
            female: this.fb.array([this.femaleItemArray()])
          }));
        }
      }
      console.log(this.gArray);
      return this.gArray;
    } else {
      console.log("In else");
      return [this.fb.group({
        activityId: new FormControl(''),
        groupName: new FormControl(''),
        male: this.fb.array([this.maleItemArray()]),
        female: this.fb.array([this.femaleItemArray()])
      })];
    }
  }

  /**
   * @param {JSON} details
   * Create items of male in new event 
   */
  maleItemArray(details?) {
    return this.fb.group({
      itemName: new FormControl(details ? details.itemName : ''),
      itemType: new FormControl(details ? details.itemType : ''),
      itemPrice: new FormControl(details ? details.itemPrice : '')
    })
  }

  addItemsMale(index) {
    console.log(index)
    const control = <FormArray>index.controls.male;
    control.push(this.maleItemArray());
  }
  removeItemsMale(gIndex, mIndex) {
    const control = <FormArray>gIndex.controls.male;
    control.removeAt(mIndex);
  }

  /**
   * @param {JSON} details
   * Create items of female in new event 
   */
  femaleItemArray(details?) {
    return this.fb.group({
      itemName: new FormControl(details ? details.itemName : ''),
      itemType: new FormControl(details ? details.itemType : ''),
      itemPrice: new FormControl(details ? details.itemPrice : '')
    })
  }

  /**
   * @param {String} index
   * add Item of clothes in male  
   */
  addItemsfeMale(index) {
    const control = <FormArray>index.controls.female;
    control.push(this.femaleItemArray());
  }


  /**
   * @param {String} index
   * add Item of clothes in female  
   */
  removeItemsfeMale(gIndex, fIndex) {
    const control = <FormArray>gIndex.controls.female;
    control.removeAt(fIndex);
  }


  /**
   * Create new activities for new event 
   */
  addActivity() {
    console.log("activity details", this.activityForm);
    this._eventService.addActivities(this.activityForm.value)
      .subscribe((data: any) => {
        console.log("activity response data", data);
        this.createdActivity = data.data;
        console.log("created activity response from server", this.createdActivity);
        this.initGroupForm(this.createdActivity);
        setTimeout(() => {
          $('.step_2').css({ 'display': 'none' })
          $('.step_3').css({ 'display': 'block' });
          $('.gender_slider').not('.slick-initialized').slick({
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
                breakpoint: 767,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          });
        }, 500);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * Add activity field with name,date 
   */
  addActivityField(): void {
    const control = <FormArray>this.activityForm.controls.activity;
    control.push(this.fb.group({
      activityName: new FormControl(''),
      activityDate: new FormControl(''),
      eventId: new FormControl(this.eventId)
    }));
  }

  /**
   * @param {String} i
   * To remove added activity field 
   */
  removeActivityField(i: number): void {
    const control = <FormArray>this.activityForm.controls.activity;
    control.removeAt(i);
  }

  /**
   * @param {String} activityId 
   * @param {String} i
   *  Add new group field with activity 
   */
  async AddGroupField(activityId) {
    console.log(activityId)
    console.log(this.groupForm.controls)
    const control = <FormArray>this.groupForm.controls.group;
    console.log(control.controls)
    await control.controls.push(this.groupArray(null, activityId));
    setTimeout(() => {
      $('.gender_slider').not('.slick-initialized').slick({
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
            breakpoint: 767,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      });
    }, 10);
  }

  /**
   * @param {String} i
   * To remove added group 
   */
  removeGroupField(i: number): void {
    const control = <FormArray>this.groupForm.controls.group;
    control.removeAt(i);
  }

  /**
   * @param {Array} activityId
   * To get all activities with name 
   */
  getActivityName(activityId, controls) {
    // console.log("activitiesss=======>", controls);
    if (this.createdActivity)
      return this.createdActivity[_.findIndex(this.createdActivity, { _id: activityId })].activityName;
    else
      return this.eventActivities[_.findIndex(this.eventActivities, { _id: activityId })].activityName;
  }

  /**
   * Create new group in new event
   */
  addGroup() {
    // this.eventId = '5d6613c7ae51902a2b045c81';
    this.groupForm.controls.eventId.setValue(this.eventId);
    const control = <FormArray>this.groupForm.controls.group;
    let values = [];
    _.forEach(control.controls, (ctr) => {
      values.push(ctr.value);
    })
    this.groupForm.value.group = values;
    console.log("created group details", this.groupForm);
    this._eventService.addGroup(this.groupForm.value)
      .subscribe((data: any) => {
        console.log("display created group data", data);
        this.alertService.getSuccess(data.message)
        this.router.navigate(['home/myEvent'])
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /** 
   * @param {String} eventId
   * To get all details of particular event 
   */
  viewDetailsOfEvent(eventId) {
    this._eventService.getEventDetails(eventId)
      .subscribe((data: any) => {
        console.log("created event details ", data);
        this.createdEventDetails = data.data;
        $('.selected_event_type > a').html(this.createdEventDetails.eventType);
        this.eventForm.controls.eventType.setValue(this.createdEventDetails.eventType);
        this.selectedStartDate = this.createdEventDetails.startDate.split("T")[0];
        console.log(this.selectedStartDate);
        this.selectedEndDate = this.createdEventDetails.endDate.split("T")[0];
        console.log(this.selectedEndDate);
        this.paymentDeadlineDate = this.createdEventDetails.paymentDeadlineDate.split("T")[0];
        console.log(this.paymentDeadlineDate);
        this.eventActivities = this.createdEventDetails.activity;
        console.log(this.eventActivities);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * If any changes update event
   */
  updateEvent($this) {
    this.getActivityFrom(this.eventActivities);
  


      if ($('.slick-active').hasClass("done")) {
        console.log("in twelve_slide");
        // this._eventService.addEvent(this.eventForm.value, this.files, this.themeFiles)
        //   .subscribe((data: any) => {
        //     console.log("event details", data);
        
        //   }, (err: any) => {
        //     console.log(err);
        //     this.alertService.getError(err.message);
        //   })
        this._eventService.updateEvent(this.eventId, this.eventForm.value, this.files)
        .subscribe((data:any) => {
          console.log(data);
              $('.step_1').css({ 'display': 'none' })
            $('.step_2').css({ 'display': 'block' });
            this.eventId = data.data._id;
            console.log("created eventid", this.eventId);
            this.getActivityFrom();
        }, (err: any) => {
          console.log(err);
          this.alertService.getError(err.message);
        })
      }
      console.log("data of event", $('.slick-active').hasClass("twelve_slide"));
      if ($('.slick-active').hasClass("twelve_slide")) {
        $('.slick-active').addClass("done")
      }
  }

  /**
   *  Updating activity if any changes
   */
  updateActivity() {
    // console.log("Update Event");
    this._eventService.updateActivity(this.activityForm.value)
      .subscribe(data => {
        console.log(data);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
    this.initGroupForm(this.eventActivities);
  }

  /**
   *  Updating group if any changes
   */
  updateGroup() {
    console.log(this.groupForm.value);
    this._eventService.updateGroup(this.groupForm.value)
      .subscribe(data => {
        console.log("updated group details", data);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  getBankDetails() {
    this._eventService.getBankDetails()
      .subscribe((data: any) => {
        console.log(data);
        this.bankDetails = data.data.bankDetail;
        setTimeout(()=>{
          this.bankDetailsSlider();
        })
        console.log("har har mahadev", this.bankDetails);
      }, err => {
        console.log(err);
      })
  }

  bankDetailsSlider() {
    $('.slider1').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      prevArrow: '<button class="prevarrow text-center"><i class="fa fa-caret-left" aria-hidden="true"></i></button>',
      nextArrow: '<button class="nextarrow text-center"><i class="fa fa-caret-right" aria-hidden="true"></i></button>',
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
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
  addMoreBankDetails() {
    console.log(this.bankDetailsForm);
    $('#exampleModal').modal('toggle');
    this.submitted = true;
    if (this.bankDetailsForm.invalid) {
      return;
    }
    this.isDisable = true;
    this._loginService.addBankDetails(this.bankDetailsForm.value)
      .subscribe((data: any) => {
        console.log("data of bank details", data);
        this.alertService.getSuccess(data.message)
        this.bankDetailsForm.reset();
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }
  getDetails(e, details) {
    console.log(details);
  }

  validateBankName(form) {
    console.log(form);
    const nameInput = /[a-zA-Z ]/;
    let message1 = document.getElementById('message1');
    if (!form.bankName.match(nameInput)) {
      console.log("message==========", message1)
      message1.innerHTML = "Name can not start with digit"
    } else {
      message1.innerHTML = "";
    }
  }
  validateAccountNumber(form) {

    console.log(form);
    const phoneno = /[0-9]/;
    let message = document.getElementById('message');
    if (!form.accountNumber.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";
    }
  }
  validateIFSCCode(form) {
    console.log(form);
    const phoneno = /[0-9]/;
    let message = document.getElementById('message');
    if (!form.IFSCCode.match(phoneno)) {
      console.log("message==========", message)
      message.innerHTML = "Please enter only numbers"
    } else {
      message.innerHTML = "";

    }
  }

  addGroupWithActivity(id) {
    console.log("activity id ", id);
    this.selectedActivityToAddGroup = id;
    const control = <FormArray>this.groupForm.controls.group;
    // console.log("item==========================================>", control.controls, _.findIndex(control.controls, { value: { activityId: this.selectedActivityToAddGroup } }));
    if (_.findIndex(control.controls, { value: { activityId: this.selectedActivityToAddGroup } }) === -1)
      this.AddGroupField(this.selectedActivityToAddGroup);
    $('.gender_slider').not('.slick-initialized').slick({
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
          breakpoint: 767,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  printItem(item) {
    console.log("item==========================================>", item.value.activityId);
  }
}
