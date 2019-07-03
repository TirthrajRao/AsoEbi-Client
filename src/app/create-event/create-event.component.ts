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
  files: Array<File> = [];
  eventId: any;


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
      isPublic: new FormControl(''),
      isLogistics: new FormControl('')

    })
    this.activityForm = new FormGroup({
      activity: this.fb.array([this.activityArray()])
    })
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


  activityArray() {
    return this.fb.group({
      activityName: new FormControl(''),
      activityDate: new FormControl(''),
      eventId: new FormControl(this.eventId)
    })
  }

  addActivity() {
    console.log("activity details", this.activityForm);
  }

  addActivityField(): void
  {
    const control = <FormArray>this.activityForm.controls.activity;
    control.push(this.activityArray());
  }

  removeActivityField(i:number): void{
    const control = <FormArray>this.activityForm.controls.activity;
    control.removeAt(i);
  }

}
