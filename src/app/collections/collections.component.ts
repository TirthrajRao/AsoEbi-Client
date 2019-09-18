import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { LoginService } from '../services/login.service';
import * as _ from 'lodash';
// import * as $ from 'jquery';   

declare var $: any;

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent implements OnInit {

  private sub: any;
  private eventId: any;
  activitiesCollections: any = [];
  groupCollections: any = [];
  femaleTotal = 0;
  maleTotal = 0;
  totalCollection: any;
  finalTotal;
  allGuestList: any;
  $slideContainter;
  $slider;
  isLoad = false;
  from = false;
  fromClass;
  activityTotal: any;
  userName = JSON.parse(sessionStorage.getItem('userName'));
  manualLoginUser = JSON.parse(sessionStorage.getItem('currentUser'));


  colorSettings = {
    section: ['#d7d7d7', '#d0dadc', '#a4a5a8', '#dadbdf', '#2b2f31'],
    prevArrows: ['#9ec23b', '#19a7b2', '#fcb638', '#b930a8', '#d44b3d'],
    heading: ['#475454', '#e70054', '#424242', '#130829', '#d44b3d'],
    mainButton: ['#9ec23b', '#19a7b2', '#fcb638', '#b930a8', '#d44b3d'],
    buttonGroup: ['#3dbbcd', '#feb332', '#ce3259', '#00c0e6', '#9a8970']
  };
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService, private _loginService: LoginService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.getCollections(this.eventId);
      this.totalAmountOfUser(this.eventId);
      this.guestList(this.eventId);
    })

  }
  ngOnInit() {
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });
    console.log(this.userName);
    setTimeout(() => {
      this.changeColors(0);
    }, 200);
  }

  openMenu() {
    $(".new_event_menu_box").toggle();
  }

  changeColors(slide) {
    setTimeout(() => {

      console.log("slide of collection", slide)
      $('input:radio[id=' + slide + '0]').prop('checked', true);
      let colorSettings = {
        section: ['#d7d7d7', '#d0dadc', '#a4a5a8', '#dadbdf', '#2b2f31'],
        prevArrows: ['#9ec23b', '#19a7b2', '#fcb638', '#b930a8', '#d44b3d'],
        heading: ['#475454', '#e70054', '#424242', '#130829', '#d44b3d'],
        mainButton: ['#9ec23b', '#19a7b2', '#fcb638', '#b930a8', '#d44b3d'],
        buttonGroup: ['#3dbbcd', '#feb332', '#ce3259', '#00c0e6', '#9a8970']
      };
      console.log("color=========>", slide);
      $('.collection_slider_section').css({
        background: colorSettings.section[slide]
      }, 10);
      $('.collection_slider button.slick-prev :hover, .collection_slider button.slick-next :hover').css({
        color: colorSettings.prevArrows[slide]
      }, 10);
      $('.collection_slider_section h3').css({
        color: colorSettings.heading[slide]
      }, 10);
      $('.collection_slider .tom_btn').css({
        background: colorSettings.mainButton[slide]
      }, 10);
      $('.collection_slider .total_btn a').css({
        background: colorSettings.buttonGroup[slide]
      }, 10);
    }, 10)
  };

  initCollectionSlider() {
    setTimeout(() => {
      this.$slideContainter = $('.collection_slider'),
        this.$slider = this.$slideContainter.not('.slick-initialized').slick({
          dots: true,
          infinite: false,
          speed: 1000,
          draggable: true,
          arrows: true,
          prevArrow: "<button type='button'  class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
          nextArrow: "<button type='button' class='slick-next pull-right'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
          // autoplay:true
        });
      this.$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        setTimeout(function () {
          var activeNow = $('.slick-dots li.slick-active').text();
          $('.slick-dots').removeClass('slideOne');
          $('.slick-dots').removeClass('slideTwo');
          $('.slick-dots').removeClass('slideThree');
          $('.slick-dots').removeClass('slideFour');
          $('.slick-dots').removeClass('slideFive');
          var className = ['slideOne', 'slideTwo', 'slideThree', 'slideFour', 'slideFive'];
          $('.slick-dots li').parent('.slick-dots').addClass(className[activeNow - 1]);
        }, 10);
      });
      var changeColors = this.changeColors;
      var handleChange = (i) => {
        if (i < this.activitiesCollections.length)
          this.handleChange(this.activitiesCollections[i].group[0])
      };
      this.$slider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        changeColors(nextSlide);
        handleChange(nextSlide);
      });

    }, 10)

    $('#display_slide').on('click', () => {
      this.priveviousSlide();
    })
  }

  getFemaleTotal(total) {
    console.log("female totall", total);
    this.femaleTotal += total;
    return this.femaleTotal;
  }
  getMaleTotal(total) {
    console.log("male total", total);
    this.maleTotal += total;
    return this.maleTotal;
  }

  handleChange(event) {
    console.log(event);
    this.maleTotal = 0;
    this.femaleTotal = 0;
    _.forEach(event.item, (item) => {
      console.log("item====================>Before", item);
      // console.log()
      if (item.itemGender == 'male') {
        this.maleTotal = this.getMaleTotal(item.total);
      }
      if (item.itemGender == 'female') {
        this.femaleTotal = this.getFemaleTotal(item.total);
      }
      console.log("item====================>after", item);
    })
  }

  getCollections(id) {
    this.isLoad = true;
    this._eventService.getCollections(id)
      .subscribe((data: any) => {
        console.log("total collections of ", data);
        setTimeout(() => {
          this.isLoad = false;
          this.initCollectionSlider()
        }, 10)
        this.activityTotal = data.data.activityWise;
        console.log("activity array", this.activityTotal);
        this.activitiesCollections = data.data.groupWise;
        console.log("this.activitiesCollections", this.activitiesCollections);
        this.activitiesCollections.forEach((singleActivity) => {
          this.activityTotal.forEach((singlePriceObject) => {
            if (singlePriceObject.activityName == singleActivity._id) {
              singleActivity['totalPrice'] = singlePriceObject.total;
            }
          });
        });
        _.forEach(this.activitiesCollections[0].group[0].item, (item) => {
          console.log(item)
          let activityTotal = item.itemPrice
          if (item.itemGender == 'male') {
            this.maleTotal = this.getMaleTotal(item.total)
          }
          if (item.itemGender == 'female') {
            this.femaleTotal = this.getFemaleTotal(item.total)
          }
        });
        //  this.activityTotal = 0;
        _.forEach(this.activitiesCollections.group, (singleGroup) => {
          console.log("single group=======================>", singleGroup);
          _.forEach(singleGroup.item, (singleItem) => {
            console.log("singleItem.itemPrice ==> ", singleItem.itemPrice);
            if (singleItem.itemPrice) {
              this.activityTotal = this.activityTotal + singleItem.itemPrice;
            }
          })
        });
        // console.log("TOTAL PRICE =====>" , this.activityTotal);  
        setTimeout(() => {
          $('input:radio[id=00]').prop('checked', true);
          this.initCollectionSlider()
        }, 10)
      }, err => {
        this.isLoad = false;
        console.log(err);
      })
  }

  totalAmountOfUser(eventId) {
    console.log("event id of single event", eventId);
    this._eventService.totalAmount(eventId)
      .subscribe((data: any) => {
        this.totalCollection = data.data;
        console.log("total collection of event", this.totalCollection)
      }, err => {
        console.log(err);
      })
  }
  guestList(eventId) {
    this._eventService.guestList(eventId)
      .subscribe((data: any) => {
        this.allGuestList = data.data.guestDetail;
        console.log("this============", this.allGuestList);
        // })
      }, err => {
        console.log(err);
      })
  }
  totalCost(goto, from) {
    console.log("classss", goto, from);
    this.fromClass = from;
    console.log("this.formclass", this.fromClass);
    if (this.from == false) {

      $('.' + goto).css({ 'display': 'block' });
      $('.' + from).css({ 'display': 'none' });
    }
  }
  priveviousSlide() {
    console.log("hale che")
    this.from = true;
    if (this.from == true) {
      $(this.fromClass).css({ 'display': 'block' });
    }
  }
  logout() {
    this._loginService.logout();
    this.router.navigate(['/display-page']);
  }
}