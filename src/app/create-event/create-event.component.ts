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
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';




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
  valuedate = Date.now();
  model;
  userName = JSON.parse(localStorage.getItem('userName'));
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
      background: new FormControl(''),
      defaultImage: new FormControl('')
    })

    this.bankDetailsForm = new FormGroup({
      bankName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
      accountNumber: new FormControl('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
      // IFSCCode: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)])
    })


  }
  ngOnInit() {
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    console.log("login user name", this.userName)
    // this.createdActivity = [
    //   {

    //     activityName: "vzvsdfrsfrsr",
    //     createdAt: "2019-09-03T13:56:44.676Z",
    //     isDeleted: false,
    //     updatedAt: "2019-09-03T13:56:44.676Z",
    //     _id: "5d6f1ecbc9e2730f32beba99"
    //   }, {
    //     activityName: "dfsfdsfdsfdsfdsFdsf",
    //     createdAt: "2019-09-03T13:56:44.676Z",
    //     isDeleted: false,
    //     updatedAt: "2019-09-03T13:56:44.676Z",
    //     _id: "5d6f1ecbc9e2730f32beba98"
    //   }, {
    //     activityName: "fsdfdsfdsfZXCERere",
    //     createdAt: "2019-09-03T13:56:44.676Z",
    //     isDeleted: false,
    //     updatedAt: "2019-09-03T13:56:44.676Z",
    //     _id: "5d6f1ecbc9e2730f32beba97"
    //   },
    //   {
    //     activityName: "cvvzcxvrtgrtrtrt",
    //     createdAt: "2019-09-03T13:56:44.676Z",
    //     isDeleted: false,
    //     updatedAt: "2019-09-03T13:56:44.676Z",
    //     _id: "5d6f1ecbc9e2730f32beba96"
    //   }
    // ]
    this.getActivityFrom(),
      // this.initGroupForm(this.createdActivity);
      this.initGroupForm();
    this.initCreatedActivitySlider()
    $('#eventId').css({ 'display': 'none' });
    // $(document).ready(function () {

    // $("#deadLineDate").val(Date.now());
    // $("#deadLineDate").datepicker({ dateFormat: 'yyyy-MM-dd' }).val();
    //   $("#deadLineDate").datepicker({dateFormat: "yy-mm-dd"});

    $("#deadLineDate").datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });


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
    // this.getBankDetails();

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

    // change font style start
    $(".normal_style").click(function (event) {
      $("input").removeClass('italic_style1');
      $('input').removeClass('starry_style1');
      $('input').removeClass('carved_wood_style1');
      $("input").addClass('normal_style1');
    });

    $(".italic_style").click(function (event) {
      $('input').removeClass('normal_style1');
      $('input').removeClass('starry_style1');
      $('input').removeClass('carved_wood_style1');
      $("input").addClass('italic_style1');
    });

    $(".starry_style").click(function (event) {
      $("input").removeClass('normal_style1');
      $('input').removeClass('italic_style1');
      $('input').removeClass('carved_wood_style1');
      $("input").addClass('starry_style1');
    });

    $(".carved_wood_style").click(function (event) {
      $("input").removeClass('normal_style1');
      $("input").removeClass('starry_style1');
      $('input').removeClass('italic_style1');
      $("input").addClass('carved_wood_style1');
    });

    // change font style end


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

    // $('#next_btn').on('click', () => {
    //   if (this.eventId) {

    //     this.updateEvent($(this));
    //   }
    //   else {
    //     this.addEvent($(this));
    //   }
    // })


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
    this.eventForm.value.deadlineDate = $('#deadLineDate').val();
    console.log(this.eventForm.value);
    console.log("data of event", $('.slick-active').hasClass("done"));
    // if ($('.slick-active').hasClass("done")) {
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
    // // }
    // console.log("data of event", $('.slick-active').hasClass("twelve_slide"));
    // if ($('.slick-active').hasClass("twelve_slide")) {
    //   $('.slick-active').addClass("done")
    // }
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

  defaultBackgroundImage(path, id) {
    console.log(path, id);
    $('id').addClass('.selectedImage')
    this.eventForm.controls.defaultImage.setValue(path);
    console.log("=========", this.eventForm.value)

  }

  /**
   * @param {JSON} createdActivity
   * Edit event activities 
   */
  getActivityFrom(createdActivity?) {
    console.log("update activity details", createdActivity);
    this.activityForm = new FormGroup({
      activity: this.fb.array(this.activityArray(createdActivity))
    });
    setTimeout(() => {
      $("#activityStartDate0").datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });
      $("#activityEndDate0").datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });
    },200)
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
        activityStartDate: new FormControl(''),
        activityEndDate: new FormControl(''),
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
        activityStartDate: new FormControl(activities[i].activityStartDate.split("T")[0]),
        activityEndDate: new FormControl(activities[i].activityEndDate.split("T")[0]),
        eventId: new FormControl(activities[i].eventId)
      }))
    }
    return actArray;
  }

  /**
   * @param {String} activity
   * To create new group in event or to edit created group of event 
   */
  initGroupForm(activity?, fromUpdate = false) {
    this.groupForm = new FormGroup({
      eventId: new FormControl(activity ? activity[0].eventId : ""),
      group: this.fb.array(this.groupArray(activity, null, fromUpdate))
    })
  }

  /**
   * @param {String} activities `
   * @param {String} activityId
   *  To create new group in event or to edit created group of event 
   */
  groupArray(activities?, activityId?, fromUpdate = false) {
    console.log("new create group =======", activities, activityId);
    if (activityId) {
      return this.fb.group({
        activityId: new FormControl(activityId),
        groupName: new FormControl(''),
        // selectDate: new FormControl(''),
        male: this.fb.array([this.maleItemArray()]),
        female: this.fb.array([this.femaleItemArray()])
      });
    } else if (activities && activities.length) {
      this.gArray = [];
      for (let i = 0; i < activities.length; i++) {
        // console.log("i =", i , "details =", activities[i])
        if (activities[i].group) {
          this.selectedActivityToAddGroup = activities[0]._id;
          for (let j = 0; j < activities[i].group.length; j++) {
            let groupId = activities[i].group[j]._id;
            console.log("update group event id", this.eventId);
            console.log("j =", j, "inner details =", activities[i].group[j])
            this.gArray.push(this.fb.group({
              activityId: new FormControl(activities[i]._id),
              eventId: new FormControl(this.eventId),
              // selectDate: new FormControl(''),
              groupId: new FormControl(activities[i].group[j]._id),
              groupName: new FormControl(activities[i].group[j].groupName),
              male: this.fb.array([...this.maleItemArray(activities[i].group[j].item)]),
              female: this.fb.array([...this.femaleItemArray(activities[i].group[j].item)])
            }));
          }
          // return this.gArray;
        } else {
          this.selectedActivityToAddGroup = activities[i]._id;
          this.gArray.push(this.fb.group({
            activityId: new FormControl(activities[i]._id),
            // selectDate: new FormControl(''),
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
  maleItemArray(details?): any {
    if (details) {
      let maleArray = [];
      for (let i = 0; i < details.length; i++) {
        if (details[i].itemGender === 'male') {
          maleArray.push(this.fb.group({
            itemId: new FormControl(details[i]._id),
            itemName: new FormControl(details[i].itemName),
            itemType: new FormControl(details[i].itemType),
            itemPrice: new FormControl(details[i].itemPrice)
          }))
        }
      }
      return maleArray;
    } else {
      return this.fb.group({
        itemName: new FormControl(''),
        itemType: new FormControl(''),
        itemPrice: new FormControl('')
      })
    }
  }

  addItemsMale(index) {
    console.log(index)
    const control = <FormArray>index.controls.male;
    control.push(this.fb.group({
      itemName: new FormControl(''),
      itemType: new FormControl(''),
      itemPrice: new FormControl('')
    }));
  }
  removeItemsMale(gIndex, i, itemid, groupid, mIndex?) {
    console.log("details of remove female", gIndex, i, itemid, groupid, mIndex)
    let finalgroupId = groupid.groupId;
    if (!itemid.itemId) {
      const control = <FormArray>gIndex.controls.male;
      control.removeAt(i);
    }
    else {
      this._eventService.removeMaleItem(itemid.itemId, finalgroupId)
        .subscribe((data: any) => {
          console.log(data)
          const control = <FormArray>gIndex.controls.male;
          control.removeAt(i);
        }, err => {
          console.log(err);
        })
    }
  }

  /**
   * @param {JSON} details
   * Create items of female in new event 
   */
  femaleItemArray(details?): any {
    if (details) {
      let femaleArray = [];
      for (let i = 0; i < details.length; i++) {
        if (details[i].itemGender === 'female') {
          femaleArray.push(this.fb.group({
            itemId: new FormControl(details[i]._id),
            itemName: new FormControl(details[i].itemName),
            itemType: new FormControl(details[i].itemType),
            itemPrice: new FormControl(details[i].itemPrice)
          }))
        }
      }
      return femaleArray;
    } else {
      return this.fb.group({
        itemName: new FormControl(''),
        itemType: new FormControl(''),
        itemPrice: new FormControl('')
      })
    }
  }

  /**
   * @param {String} index
   * add Item of clothes in male  
   */
  addItemsfeMale(index) {
    const control = <FormArray>index.controls.female;
    control.push(this.fb.group({
      itemName: new FormControl(''),
      itemType: new FormControl(''),
      itemPrice: new FormControl('')
    }));
  }


  /**
   * @param {String} index
   * add Item of clothes in female  
   */
  removeItemsfeMale(gIndex, fIndex, id) {
    console.log("details of remove female", id)
    // const control = <FormArray>gIndex.controls.female;
    // control.removeAt(fIndex);
  }

  initCreatedActivitySlider() {
    $('.createdActivitySlider').not('.slick-initialized').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
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
  }

  /**
   * Create new activities for new event 
   */
  addActivity() {
    for(let i = 0 ; i< this.activityForm.value.activity.length; i++){
      this.activityForm.value.activity[i].activityStartDate = $('#activityStartDate'+i).val();
      this.activityForm.value.activity[i].activityEndDate = $('#activityEndDate'+i).val();
    }
    console.log("activity details", this.activityForm.value);
    this._eventService.addActivities(this.activityForm.value)
      .subscribe((data: any) => {
        console.log("activity response data", data);
        this.createdActivity = data.data;
        console.log("created activity response from server", this.createdActivity);
        this.initGroupForm(this.createdActivity);
        setTimeout(() => {
          $('.step_2').css({ 'display': 'none' })
          $('.step_3').css({ 'display': 'block' });
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
                breakpoint: 767,
                settings: {
                  slidesToShow: 1
                }
              }
            ]
          });
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
        }, 50);
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
      activityStartDate: new FormControl(''),
      activityEndDate: new FormControl(''),
      eventId: new FormControl(this.eventId)
    }));
    setTimeout(() => {
      $("#activityStartDate"+(control.length-1)).datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });
      $("#activityEndDate"+(control.length-1)).datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });
    },200)
  }

  /**
   * @param {String} i
   * To remove added activity field 
   */
  removeActivityField(i: number, id): void {
    console.log("activity id", id)
    if (!id.activityId) {
      const control = <FormArray>this.activityForm.controls.activity;
      control.removeAt(i);
    }
    else {
      console.log(id);
      // let event = this.eventId;
      console.log(event);
      this._eventService.removeActivity(id)
        .subscribe((data: any) => {
          console.log(data);
          this.createdActivity = data.data.activities
          this.getActivityFrom(this.createdActivity);
        }, err => {
          console.log(err);
        })
    }
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
  removeGroupField(i: number, id): void {
    console.log("id of geoup", id)
    if (!id.groupId) {
      const control = <FormArray>this.groupForm.controls.group;
      control.removeAt(i);
    }
    else {
      this._eventService.removeGroup(id)
        .subscribe((data: any) => {
          console.log(data);
          const control = <FormArray>this.groupForm.controls.group;
          control.removeAt(i);
        }, err => {
          console.log(err);
        })
    }
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
    this.eventForm.value.activityDate = $('#activityDate').val();
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
        this.eventForm.controls.isPublic.setValue(this.createdEventDetails.isPublic);
        // this.selectedStartDate = this.createdEventDetails.startDate.split("T")[0];
        console.log(this.selectedStartDate);
        // this.selectedEndDate = this.createdEventDetails.endDate.split("T")[0];
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
  updateEvent() {
    this.getActivityFrom(this.eventActivities);
    // if ($('.slick-active').hasClass("done")) {
    console.log("in twelve_slide");
    // this._eventService.addEvent(this.eventForm.value, this.files, this.themeFiles)
    //   .subscribe((data: any) => {
    //     console.log("event details", data);

    //   }, (err: any) => {
    //     console.log(err);
    //     this.alertService.getError(err.message);
    //   })
    this._eventService.updateEvent(this.eventId, this.eventForm.value, this.files)
      .subscribe((data: any) => {
        console.log(data);
        $('.step_1').css({ 'display': 'none' })
        $('.step_2').css({ 'display': 'block' });
        this.eventId = data.data._id;
        this.createdActivity = data.data.activities;
        console.log("created eventid", this.eventId);
        this.getActivityFrom(this.createdActivity);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
    // }
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
      .subscribe((data: any) => {
        console.log(data);
        this.createdActivity = data.data.activity;
        // _.forEach(updateACtivityData, (item)=>{
        //   _.forEach(item.activities, (itemActivity)=>{
        //     console.log("item of activity",itemActivity)

        //     this.createdActivity.push(itemActivity);
        //   } )
        // })
        // this.eventActivities = updateACtivityData.activities;
        console.log(this.createdActivity);
        setTimeout(() => {
          $('.step_2').css({ 'display': 'none' })
          $('.step_3').css({ 'display': 'block' });
          $('.gender_slider').not('.slick-initialized').slick({
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
          this.initGroupForm(this.createdActivity, true);
        }, 500);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   *  Updating group if any changes
   */
  updateGroup() {
    this.groupForm.controls.eventId.setValue(this.eventId);
    console.log(this.groupForm.value);
    this._eventService.updateGroup(this.groupForm.value)
      .subscribe(data => {
        console.log("updated group details", data);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
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
    console.log("item==========================================>", control.controls, _.findIndex(control.controls, { value: { activityId: this.selectedActivityToAddGroup } }));
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
    console.log("item==========================================>", this.selectedActivityToAddGroup, item.value.activityId);
  }
}