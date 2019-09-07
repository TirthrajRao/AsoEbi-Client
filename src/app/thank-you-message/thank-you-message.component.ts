import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../services/event.service';
import {AlertService} from '../services/alert.service';
import { config } from '../config';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-thank-you-message',
  templateUrl: './thank-you-message.component.html',
  styleUrls: ['./thank-you-message.component.css']
})
export class ThankYouMessageComponent implements OnInit {

  private sub: any;
  private eventId: any;
  thankyouMessageForm: FormGroup;
  thankYouMessage;
  isDisable:false;
  path = config.baseMediaUrl;
  files: Array<File> = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.getThankYouMessage(this.eventId);
    })
  }

  ngOnInit() {
    // menu toggle start
    $(".new_event_menu").click(function(){
      $(".new_event_menu_box").toggle();
    });
    // menu toggle end
       /**
     * Thank you message form
     */
     this.thankyouMessageForm = new FormGroup({
       message: new FormControl(''),
       attachment: new FormControl(''),
       eventId: new FormControl(this.eventId)
     })
   }

getThankYouMessage(id){
  this._eventService.getThankyouMessage(id)
  .subscribe((data: any)=>{
    this.thankYouMessage = data.data.thanksMessage;
    console.log("data", this.thankYouMessage)
  }, err=>{
    console.log(err);
  })

}

  /**
   * Using of ckEditor for message
   */
   // public Editor = ClassicEditor;
   // public configuration = { placeholder: 'Enter Comment Text...' };
   // public onReady(editor) {
     //   editor.ui.getEditableElement().parentElement.insertBefore(
     //     editor.ui.view.toolbar.element,
     //     editor.ui.getEditableElement()
     //   );
     // }


  /**
   * @param {Object} data
   * Create new thank you message 
   */
   thankyouMessage(data?) {
     console.log(this.thankyouMessageForm);
     this._eventService.thankyouMessage(this.thankyouMessageForm.value, this.files)
     .subscribe(data => {
       console.log("thank you message response", data);
       this.router.navigate(['home/myEvent'])
     }, (err: any) => {
       console.log(err);
       this.alertService.getError(err.message);
     })
   }

  /**
   * @param {Object} event
   * Add new image,gif in thank you message 
   */
   addFile(event) {
     console.log(event);
     _.forEach(event, (file: any) => {
       if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png" || file.type == "image/gif") {
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

 }
