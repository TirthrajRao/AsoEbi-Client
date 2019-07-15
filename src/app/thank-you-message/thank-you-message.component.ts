import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {EventService} from '../services/event.service';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import * as _ from 'lodash';

@Component({
  selector: 'app-thank-you-message',
  templateUrl: './thank-you-message.component.html',
  styleUrls: ['./thank-you-message.component.css']
})
export class ThankYouMessageComponent implements OnInit {

  private sub: any;
  private eventId: any;
  thankyouMessageForm: FormGroup;
  files: Array<File> = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService) {
      this.sub = this.route.params.subscribe(params=>{
        this.eventId = params.id;
        console.log(this.eventId);
        // this.viewDetailsOfEvent(this.eventId);
      })
     }

  ngOnInit() {
    this.thankyouMessageForm = new FormGroup({
      message: new FormControl(''),
      attachment: new FormControl(''),
      eventId: new FormControl(this.eventId)
    })
  }

  public Editor = DecoupledEditor;
  public configuration = { placeholder: 'Enter Comment Text...' };
  public onReady( editor ) {
      editor.ui.getEditableElement().parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
      );
  }



  thankyouMessage(data){
    console.log(this.thankyouMessageForm);
    this._eventService.thankyouMessage(this.thankyouMessageForm.value, this.files)
    .subscribe(data=>{
      console.log("thank you message response", data);
    },err=>{
      console.log(err);
    })
  }

  changeFile(event) {
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
