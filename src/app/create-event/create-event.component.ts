import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../services/event.service';
import {AlertService} from '../services/alert.service';
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

  // private eventId: any;




  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService,private alertService:AlertService, private fb: FormBuilder) {
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
    $(document).ready(function() {
      // $("#startDate").datepicker({dateFormat: "yy-mm-dd"});
    
      $("#startDate").datepicker({"setDate": new Date(), "minDate": new Date(), dateFormat: 'yy-mm-dd'});
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


  get f() { return this.eventForm.controls; }



  /**
   * @param {JSON}
   * Event all details in json object for new event
   */
  addEvent() {
    console.log("data of event", this.eventForm,this.files);
    this._eventService.addEvent(this.eventForm.value, this.files, this.themeFiles)
      .subscribe((data: any) => {
        console.log("event details", data);
        this.eventId = data.data._id;
        console.log("helloooooooooo");
        console.log("created eventid", this.eventId);
        this.getActivityFrom();
      }, err => {
        console.log(err);
      })
  }

  /**
   * To upload main profile photo of event 
   */
  addFile(event) {
    console.log(event);
    // _.forEach(event, (file: any) => {
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
   * To upload theme photo of event 
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
   * @param {JSON} activityForm array 
   * To get total no of users which are used ASO-EBI
   */
  getActivityFrom(createdActivity?) {
    this.activityForm = new FormGroup({
      activity: this.fb.array(this.activityArray(createdActivity))
    })
  }

  /**@body {JSON} activityName, activityDate, eventId
   * To create different types of activities of event with it's date
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

  /**@param {JSON} eventId & all activies id 
   * To create group of different activites passed all activities id which created in another function and passed it in this function which help 
   * to create different group in same activity
   */
  initGroupForm(activity) {
    this.groupForm = new FormGroup({
      eventId: new FormControl(activity[0].eventId),
      group: this.fb.array(this.groupArray(activity, null))
    })
  }


  /**@param {JSON} activityId,groupName, arrayof (male, female)
   * to create different groups for one activity for male and female
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

  /**@param {JSON} itemName,itemType,itemPrice
   * To create male object with their clothes with it's type,name & price with releated groups
   */
  maleItemArray(details?) {
    return {
      itemName: new FormControl(details ? details.itemName : ''),
      itemType: new FormControl(details ? details.itemType : ''),
      itemPrice: new FormControl(details ? details.itemPrice : '')
    }
  }


  /**@param {JSON} itemName,itemType,itemPrice
   * To create female object with their clothes with it's type,name & price with releated groups
   */
  femaleItemArray(details?) {
    return {
      itemName: new FormControl(details ? details.itemName : ''),
      itemType: new FormControl(details ? details.itemType : ''),
      itemPrice: new FormControl(details ? details.itemPrice : '')
    }
  }



  /**@param {JSON} activityName & activityDate
   * To create single activity or to create more than one activity
   */
  addActivity() {
    console.log("activity details", this.activityForm);
    this._eventService.addActivities(this.activityForm.value)
      .subscribe((data: any) => {
        console.log("activity response data", data);
        this.createdActivity = data.data;
        console.log("created activity response from server", this.createdActivity);
        this.initGroupForm(this.createdActivity);
      }, err => {
        console.log(err);
      })
  }



  /**
   * To add more than one activity at single time click on add button and display another
   * blank field to add activity  
   */
  addActivityField(): void {
    const control = <FormArray>this.activityForm.controls.activity;
    control.push(this.fb.group({
      activityName: new FormControl(''),
      activityDate: new FormControl(''),
      eventId: new FormControl(this.eventId)
    }));
  }


  /**@param{index} i
   * If remove any activities pass it's index value and that activity should be 
   * remove from activity array
   */
  removeActivityField(i: number): void {
    // console.log(i);
    const control = <FormArray>this.activityForm.controls.activity;
    control.removeAt(i);
  }

  /**@param(JSON) activityId & index
   * To add more than one group at single time and in single activity  
   */
  AddGroupField(activityId, i: number): void {
    // console.log("selcet button", i);
    const control = <FormArray>this.groupForm.controls.group;
    console.log(control)
    control.push(this.groupArray(null, activityId));
  }


  /**@param(Json) activityId, index
   * To remove unwanted groups from activity list
   */
  removeGroupField(i: number): void {
    const control = <FormArray>this.groupForm.controls.group;
    control.removeAt(i);
  }



  /**@param(JSON) activityId
   * To print activity name top of the group form   
   */
  getActivityName(activityId) {
    console.log("activitiesss=======>",activityId);
    if (this.createdActivity)
      return this.createdActivity[_.findIndex(this.createdActivity, { _id: activityId })].activityName;
    else
      return this.eventActivities[_.findIndex(this.eventActivities, { _id: activityId })].activityName;
  }


  /**@param(JSON) eventId,groupName,activitiesId,male{itemName,itemType,itemPrice},female{itemName,itemType,itemPrice}
   * To add group in different activities with different groups and its male and female object  
   */
  addGroup() {
    this.groupForm.controls.eventId.setValue(this.eventId)
    console.log("created group details", this.groupForm.value);
    this._eventService.addGroup(this.groupForm.value)
      .subscribe((data:any) => {
        console.log("display created group data", data);
        this.alertService.getSuccess(data.message)
        this.router.navigate(['home/myEvent'])
      }, err => {
        console.log(err);
      })
  }




  /**
   * @param(id) eventId
   * To get details of particular event 
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
      }, err => {
        console.log(err);
      })
  }

  /**
   *  Updating event if any changes
   */
  updateEvent() {
    // console.log("Update Event");
    this.getActivityFrom(this.eventActivities);
    this._eventService.updateEvent(this.eventId, this.eventForm.value, this.files)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
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
      }, err => {
        console.log(err);
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
      }, err => {
        console.log(err);
      })
  }




}
