import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { EventService } from '../services/event.service';
import { config } from '../config';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  adminUser= JSON.parse(sessionStorage.getItem('userRole'));
  searchText;
  searchEvent: any = [];
  publicEvents: any = [];
  path = config.baseMediaUrl;

  

  constructor(private _loginService: LoginService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private _eventService: EventService) {
    if (!this.currentUser) {
      $('#navbarSupportedContent').css({ 'display': 'none' });
    }
  }

  ngOnInit() {
    $('#menu-action').click(function () {
      $('.sidebar').toggleClass('active');
      $('.main').toggleClass('active');
      $(this).toggleClass('active');
      if ($('.sidebar').hasClass('active')) {
        $(this).find('i').addClass('fa-close');
        $(this).find('i').removeClass('fa-bars');
      } else {
        $(this).find('i').addClass('fa-bars');
        $(this).find('i').removeClass('fa-close');
      }
    });
  }


  /** 
   * @param {string} searchText 
   * on key search response of public events 
   */
  onKey(searchText) {
    console.log(searchText);
    this._eventService.getPublicEvents(searchText)
      .subscribe(data => {
        console.log(data);
        this.searchEvent = data;
        console.log(this.searchEvent)
        this.publicEvents = this.searchEvent.data;
      }, err => {
        console.log(err);
      })
  }

  /**
   * get all public events
   */
  getPublicEvents() {
    this._eventService.getPublicEvents()
      .subscribe((data: any) => {
        console.log("data of public event", data);
        this.publicEvents = data.data;
        console.log("this.publicEvents", this.publicEvents);
      }, err => {
        console.log(err);
      })
  }

  /**
   * user logout of website
   */
  logout() {
    this._loginService.logout();
    this.router.navigate(['/login']);
  }

}
