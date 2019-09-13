import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';
import { LoginService } from '../services/login.service';
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
  eventTheme;
  userName = JSON.parse(localStorage.getItem('userName'));
  path = config.baseMediaUrl;
  files: Array<File> = [];

  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private _loginService: LoginService, private alertService: AlertService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.getThankYouMessage(this.eventId);
    })
  }

  ngOnInit() {
    // menu toggle start
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    // function typeMessage(typing) {
    //   var aText = new Array(
    //     "{{thankYouMessage.message}}" 
    //   );
    //   var iSpeed = 100;
    //   var iIndex = 0;
    //   var iArrLength = aText[0].length;
    //   var iScrollAt = 20;
    //   var iTextPos = 0;
    //   var sContents = '';
    //   var iRow;
    //   function typewriter() {
    //     sContents = ' ';
    //     iRow = Math.max(0, iIndex - iScrollAt);
    //     var destination = document.getElementById("thankyou_font_msg");
    //     while (iRow < iIndex) {
    //       sContents += aText[iRow++] + '<br />';
    //     }
    //     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "";
    //     if (iTextPos++ == iArrLength) {
    //       iTextPos = 0;
    //       iIndex++;
    //       if (iIndex != aText.length) {
    //         iArrLength = aText[iIndex].length;
    //         setTimeout("typewriter()", 500);
    //       }
    //     } else {
    //       setTimeout("typewriter()", iSpeed);
    //     }
    //   }
    //   typewriter();
    // }
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

  getThankYouMessage(id) {
    this._eventService.getThankyouMessage(id)
      .subscribe((data: any) => {
        this.thankYouMessage = data.data.thanksMessage;
        if (this.thankYouMessage) {
          this.eventTheme = this.thankYouMessage.attachment
        }
        // console.log("data", this.eventTheme)
      }, err => {
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
  thankyouMessage() {
    //  this.isDisable = true;
    console.log(this.thankyouMessageForm);
    this._eventService.thankyouMessage(this.thankyouMessageForm.value, this.files)
      .subscribe(data => {
        this.thankyouMessageForm.reset();
        this.getThankYouMessage(this.eventId);
        console.log("thank you message response", data);
        //  this.router.navigate(['home/myEvent'])
        $('.step_one').css({ 'display': 'none' })
        $('.step_two').css({ 'display': 'block' })
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

  addThnakyou() {
    $('.step_two').css({ 'display': 'none' })
    $('.step_one ').css({ 'display': 'block' })
  }
  closeThnakyou() {
    $('.step_one').css({ 'display': 'none' })
    $('.step_two').css({ 'display': 'block' })
  }
  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }
}
