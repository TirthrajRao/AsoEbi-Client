import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { config } from '../config';
import { AlertService } from '../services/alert.service';
import loadjs from 'loadjs';
import * as _ from 'lodash';
declare var $: any;


@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {

  path = config.baseMediaUrl;
  searchText;
  searchEvent: any = [];
  publicEvents: any = [];
  isDiable: false;
  // colorSettings;
  constructor(private router: Router, private _eventService: EventService, private alertService: AlertService) {
  }

  ngOnInit() {

    var $slideContainterHome = $('.home_slider'),
      $sliderH = $slideContainterHome.not('.slick-initialized').slick({
        dots: true,
        infinite: true,
        speed: 1000,
        draggable: true,
        arrows: false,
        autoplay: true
      });
    $sliderH.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      setTimeout(function () {
        var activeNow = $('.slick-dots li.slick-active').text();
        // $('.slick-dots li').fadeOut();
        $('.slick-dots').removeClass('green');
        $('.slick-dots').removeClass('pink');
        $('.slick-dots').removeClass('orange');
        $('.slick-dots').removeClass('white');
        var className = ['green', 'pink', 'orange', 'white'];
        $('.slick-dots li').parent('.slick-dots').addClass(className[activeNow - 1]);
        // $('.slick-dots li').fadeIn();
      }, 10);
    });

    let colorSettings = {
      section: ['#cdd6d5', '#cdcdcd', '#e7e7e7', '#f7f7f7'],
      btn1: ['#2b3335', '#34233b', '#19aaad', '#4e4e4e'],
      btn2: ['#659827', '#f73953', '#ef6439', '#f4ad48']
    }
    var changeColors = function (slide) {
      console.log("color=========>", colorSettings.section[slide]);
      $('.slider_background').css({
        background: colorSettings.section[slide]
      }, 10);
      $('.btn_join').css({
        background: colorSettings.btn1[slide]
      }, 10);
      $('.btn_enter').css({
        background: colorSettings.btn2[slide]
      }, 10);
    };
    changeColors(0);

    $sliderH.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
      changeColors(nextSlide);
    });

  }



  /**
   * @param {String} eventTheme
   *Background image of event   
   */
  getSrc(eventTheme) {
    return `url(` + this.path + eventTheme + `)`;
  }

  /**
   * @param {String} searchText
   * On key search of public event 
   */
  onKey(searchText) {
    console.log(searchText);
    this._eventService.getPublicEvents(searchText)
      .subscribe(data => {
        console.log(data);
        this.searchEvent = data;
        console.log(this.searchEvent)
        this.publicEvents = this.searchEvent.data;
      }, (err: any) => {
        console.log(err);
        this.alertService.getError(err.message);
      })
  }

  /**
   * Get all public events with basic details of event
   */
  // getPublicEvents() {
  //   this._eventService.getPublicEvents()
  //     .subscribe((data: any) => {
  //       console.log("data of public event", data);
  //       this.publicEvents = data.data;
  //       console.log("this.publicEvents", this.publicEvents);
  //     }, (err: any) => {
  //       console.log(err);
  //       this.alertService.getError(err.message);
  //     })
  // }

  /**
   * Redirect to login page
   */
  login() {
    this.router.navigate(['/login']);
  }
}
