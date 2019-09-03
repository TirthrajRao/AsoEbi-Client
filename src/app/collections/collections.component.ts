import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
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
  from = false;
  fromClass;
  userName = JSON.parse(localStorage.getItem('userName'));

  colorSettings = {
    section: ['#d7d7d7', '#d0dadc', '#a4a5a8', '#dadbdf', '#2b2f31'],
    prevArrows: ['#9ec23b', '#19a7b2', '#fcb638', '#b930a8', '#d44b3d'],
    heading: ['#475454', '#e70054', '#424242', '#130829', '#d44b3d'],
    mainButton: ['#9ec23b', '#19a7b2', '#fcb638', '#b930a8', '#d44b3d'],
    buttonGroup: ['#3dbbcd', '#feb332', '#ce3259', '#00c0e6', '#9a8970']
  };
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.getCollections(this.eventId);
      this.totalAmountOfUser(this.eventId);
      this.guestList(this.eventId);
    })
    $(".new_event_menu").click(function () {
      $(".new_event_menu_box").toggle();
    });

  }
  ngOnInit() {
console.log(this.userName);

    // $('.new_event_menu').click(function () {
    //   $('.new_event_menu_box').toggleClass('active');
    //   $('.main').toggleClass('active');
    //   $(this).toggleClass('active');

    //   if ($('.new_event_menu_box').hasClass('active')) {
    //     $(this).find('i').addClass('fa-close');
    //     $(this).find('i').removeClass('fa-bars');
    //   } else {
    //     $(this).find('i').addClass('fa-bars');
    //     $(this).find('i').removeClass('fa-close');
    //   }
    // });
    // this.initCollectionSlider()  
    this.changeColors(0);


  }

  changeColors(slide) {
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
  };

  initCollectionSlider() {
    setTimeout(() => {

      this.$slideContainter = $('.collection_slider'),
        this.$slider = this.$slideContainter.slick({
          dots: true,
          infinite: false,
          speed: 1000,
          draggable: true,
          arrows: true,
          prevArrow: "<button type='button' id='display_slide' class='slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></button>",
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
    this._eventService.getCollections(id)
      .subscribe((data: any) => {
        console.log("total collections of ", data);
        this.activitiesCollections = data.data;
        console.log("activity array", this.activitiesCollections);
        _.forEach(this.activitiesCollections[0].group[0].item, (item) => {
          if (item.itemGender == 'male') {
            this.maleTotal = this.getMaleTotal(item.total)
          }
          if (item.itemGender == 'female') {
            this.femaleTotal = this.getFemaleTotal(item.total)
          }
        })
        setTimeout(() => {
          $('input:radio[id=00]').prop('checked', true);
          this.initCollectionSlider()
        }, 10)
      }, err => {
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
    if(this.from == false){

      $('.'+goto).css({'display':'block'});
      $('.'+from).css({'display':'none'});
    }
  }
  priveviousSlide(){
    console.log("hale che")
    this.from = true;
    if(this.from == true){
      $(this.fromClass).css({'display': 'block'});
    }
  }
}