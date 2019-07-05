import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../services/event.service';
declare var $: any;
import * as _ from 'lodash';
import Swal from 'sweetalert2';




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
  eventId: any;
  createdActivity: any;
  isPublic = false;
  isLogistics = false;
  activityId;
  items;
  gArray


  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private fb: FormBuilder) { }
  ngOnInit() {

    this.eventForm = new FormGroup({
      eventTitle: new FormControl(''),
      eventType: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      hashTag: new FormControl(''),
      profile: new FormControl(''),
      deadlineDate: new FormControl(''),
      isPublic: new FormControl(this.isPublic),
      isLogistics: new FormControl(this.isLogistics)
    })
    this.activityForm = new FormGroup({
      activity: this.fb.array([this.activityArray()])
    })
  }
  ngAfterViewInit() {
    $('#eventId').css({ 'display': 'none' });
    $(function () {
      $("#datepicker").datepicker();
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


  /**@body {JSON} eventTitle,hashtag,startDate,endDate,eventType,profilePhoto,deadlineDate,logistics,piblic or private
   * To Add basic event details which filled by celebrant and after filled all the values used that generated id of event to create activities and clothes
   * of guest 
   */

  addEvent() {
    console.log("data of event", this.eventForm);
    this._eventService.addEvent(this.eventForm.value, this.files)
      .subscribe((data: any) => {
        console.log("event details", data);
        this.eventId = data.data._id;
        console.log("helloooooooooo");
        console.log("created eventid", this.eventId);
      }, err => {
        console.log(err);
      })
  }

  /**
   * To upload main profile photo of event 
   */
  addFile(event) {
    console.log(event);
    _.forEach(event, (file: any) => {
      if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png") {
        this.files.push(file);
      } else {
        Swal.fire({
          title: 'Error',
          text: "You can upload only image",
          type: 'warning',
        })
      }
    })
  }

  /**@body {JSON} activityName, activityDate, eventId
   * To create different types of activities of event with it's date
   */
  activityArray() {
    return this.fb.group({
      activityName: new FormControl(''),
      activityDate: new FormControl(''),
      eventId: new FormControl(this.eventId)
    })
  }

  /**@param {JSON} eventId & all activies id 
   * To create group of different activites passed all activities id which created in another function and passed it in this function which help 
   * to create different group in same activity
   */
  initGroupForm(activity) {
    this.groupForm = new FormGroup({
      eventId: new FormControl(''),
      group: this.fb.array(this.groupArray())
    })
  }


  /**@param {JSON} activityId,groupName, arrayof (male, female)
   * to create different groups for one activity for male and female
   */
  groupArray(activityId?) {
    if(activityId){
      return this.fb.group({
        activityId: new FormControl(activityId),
        groupName: new FormControl(''),
        male: new FormGroup(this.maleItemArray()),
        female: new FormGroup(this.femaleItemArray())
      });
    }
    this.gArray = [];
    for (let i = 0; i < this.createdActivity.length; i++) {
      this.gArray.push(this.fb.group({
        activityId: new FormControl(this.createdActivity[i].activityId),
        groupName: new FormControl(''),
        male: new FormGroup(this.maleItemArray()),
        female: new FormGroup(this.femaleItemArray())
      }));
    }
    return this.gArray;
  }

  /**@param {JSON} itemName,itemType,itemPrice
   * To create male object with their clothes with it's type,name & price with releated groups
   */
  maleItemArray() {
    return {
      itemName: new FormControl(''),
      itemType: new FormControl(''),
      itemPrice: new FormControl('')
    }
  }

  
  /**@param {JSON} itemName,itemType,itemPrice
   * To create female object with their clothes with it's type,name & price with releated groups
   */
  femaleItemArray() {
    return {
      itemName: new FormControl(''),
      itemType: new FormControl(''),
      itemPrice: new FormControl('')
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
    control.push(this.activityArray());
  }


  /**@param{index} i
   * If remove any activities pass it's index value and that activity should be 
   * remove from activity array
   */
  removeActivityField(i: number): void {
    console.log(i);
    const control = <FormArray>this.activityForm.controls.activity;
    control.removeAt(i);
  }

  /**@param(JSON) activityId & index
   * To add more than one group at sinle time and in single activity  
   */
  AddGroupField(activityId, i: number): void {
    console.log("selcet button", i);
    const control = <FormArray>this.groupForm.controls.group;
    console.log(control)
    control.push(this.groupArray(activityId));
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
  getActivityName(activityId){
    console.log(activityId);
    return this.createdActivity[_.findIndex(this.createdActivity, {activityId: activityId})].activityName;
  }


  /**@param(JSON) eventId,groupName,activitiesId,male{itemName,itemType,itemPrice},female{itemName,itemType,itemPrice}
   * To add group in different activities with different groups and its male and female object  
   */
  addGroup() {
    this.groupForm.controls.eventId.setValue(this.eventId)
    console.log("created group details", this.groupForm.value);
    this._eventService.addGroup(this.groupForm.value)
      .subscribe(data => {
        console.log("display created group data", data);
        this.router.navigate(['home/myEvent'])
      }, err => {
        console.log(err);
      })
  }




}
