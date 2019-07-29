import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
declare var $: any;
import * as _ from 'lodash';
import Swal from 'sweetalert2';
import { config } from '../config';

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

  constructor(private route: ActivatedRoute, private router: Router, private _eventService: EventService,
    private alertService: AlertService, private fb: FormBuilder) {
    this.sub = this.route.params.subscribe(params => {
      if (params.id) {
        this.eventId = params.id;
        console.log(this.eventId);
        this.viewDetailsOfEvent(this.eventId);
      }
    })
  }

  ngOnInit() {
    this.eventForm = new FormGroup({
      eventTitle: new FormControl('', [Validators.required]),
      eventType: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      hashTag: new FormControl('', [Validators.required, Validators.minLength(4)]),
      profile: new FormControl(''),
      deadlineDate: new FormControl(''),
      isPublic: new FormControl(this.isPublicVal),
      isLogistics: new FormControl(this.isLogistics),
      background: new FormControl('')
    })
    $('#eventId').css({ 'display': 'none' });
    $(function () {
      $("#datepicker").datepicker();
      // $("#startDate").val(Date.now());
      // $("#startDate").datepicker({ dateFormat: 'yyyy-MM-dd' }).val();
    });
    $(document).ready(function () {
      // $("#startDate").datepicker({dateFormat: "yy-mm-dd"});

      $("#startDate").datepicker({ "setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd' });
    });

    $("#register_steps_tab").accordion({
      heightStyle: "content"
    });
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
  }

  /**
   * Error message function 
   */
  get f() { return this.eventForm.controls; }

  /**
   * Create new event with it's details
   */
  addEvent() {
    console.log("data of event", this.eventForm, this.files);
    this._eventService.addEvent(this.eventForm.value, this.files, this.themeFiles)
      .subscribe((data: any) => {
        console.log("event details", data);
        this.eventId = data.data._id;
        console.log("helloooooooooo");
        console.log("created eventid", this.eventId);
        this.getActivityFrom();
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * @param {String} event
   * To upload profile photo of event
   */
  addFile(event) {
    console.log(event);
    if (event[0].type == "image/jpeg" || event[0].type == "image/jpg" || event[0].type == "image/png") {
      this.files = event;
    } else {
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
  initGroupForm(activity) {
    this.groupForm = new FormGroup({
      eventId: new FormControl(activity[0].eventId),
      group: this.fb.array(this.groupArray(activity, null))
    })
  }

  /**
   * @param {String} activities 
   * @param {String} activityId
   *  To create new group in event or to edit created group of event 
   */
  groupArray(activities?, activityId?) {
    console.log("jadya ne lidhe bdhu thay che =======", activities, activityId);
    if (activityId) {
      return this.fb.group({
        activityId: new FormControl(activityId),
        groupName: new FormControl(''),
        male: new FormGroup(this.maleItemArray()),
        female: new FormGroup(this.femaleItemArray())
      });
    } else if (activities.length) {
      this.gArray = [];
      for (let i = 0; i < activities.length; i++) {
        // console.log("i =", i , "details =", activities[i])
        if (activities[i].group) {
          for (let j = 0; j < activities[i].group.length; j++) {
            // console.log("j =", j , "inner details =", activities[i].group[j])
            this.gArray.push(this.fb.group({
              activityId: new FormControl(activities[i]._id),
              groupName: new FormControl(activities[i].group[j].groupName),
              male: new FormGroup(this.maleItemArray(activities[i].group[j].male)),
              female: new FormGroup(this.femaleItemArray(activities[i].group[j].female))
            }));
          }
          // return this.gArray;
        } else {
          this.gArray.push(this.fb.group({
            activityId: new FormControl(activities[i]._id),
            groupName: new FormControl(''),
            male: new FormGroup(this.maleItemArray()),
            female: new FormGroup(this.femaleItemArray())
          }));
        }
      }
      console.log(this.gArray);
      return this.gArray;
    } else {
      return this.fb.group({
        activityId: new FormControl(''),
        groupName: new FormControl(''),
        male: new FormGroup(this.maleItemArray()),
        female: new FormGroup(this.femaleItemArray())
      });
    }
  }

  /**
   * @param {JSON} details
   * Create items of male in new event 
   */
  maleItemArray(details?) {
    return {
      itemName: new FormControl(details ? details.itemName : ''),
      itemType: new FormControl(details ? details.itemType : ''),
      itemPrice: new FormControl(details ? details.itemPrice : '')
    }
  }

  /**
   * @param {JSON} details
   * Create items of female in new event 
   */
  femaleItemArray(details?) {
    return {
      itemName: new FormControl(details ? details.itemName : ''),
      itemType: new FormControl(details ? details.itemType : ''),
      itemPrice: new FormControl(details ? details.itemPrice : '')
    }
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
  AddGroupField(activityId, i: number): void {
    const control = <FormArray>this.groupForm.controls.group;
    console.log(control)
    control.push(this.groupArray(null, activityId));
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
  getActivityName(activityId) {
    console.log("activitiesss=======>", activityId);
    if (this.createdActivity)
      return this.createdActivity[_.findIndex(this.createdActivity, { _id: activityId })].activityName;
    else
      return this.eventActivities[_.findIndex(this.eventActivities, { _id: activityId })].activityName;
  }

  /**
   * Create new group in new event
   */
  addGroup() {
    this.groupForm.controls.eventId.setValue(this.eventId)
    console.log("created group details", this.groupForm.value);
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
  updateEvent() {
    this.getActivityFrom(this.eventActivities);
    this._eventService.updateEvent(this.eventId, this.eventForm.value, this.files)
      .subscribe(data => {
        console.log(data);
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
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
}
