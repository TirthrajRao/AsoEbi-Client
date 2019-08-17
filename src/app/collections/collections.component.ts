import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import * as _ from 'lodash';

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
  constructor(private route: ActivatedRoute,
    private router: Router, private _eventService: EventService) {
    this.sub = this.route.params.subscribe(params => {
      this.eventId = params.id;
      console.log(this.eventId);
      this.getCollections(this.eventId);
    })
  }

  ngOnInit() {
  }

  getFemaleTotal(total) {
    this.femaleTotal += total;
  }
  getMaleTotal(total) {
    this.maleTotal += total;
  }


  getCollections(id) {
    this._eventService.getCollections(id)
      .subscribe((data: any) => {
        console.log("total collections of ", data);
        this.activitiesCollections = data.data;
        console.log("activity array", this.activitiesCollections);
        _.forEach(this.activitiesCollections, (activity) => {
          console.log('activity==========>', activity);
          _.forEach(activity, (group) => {
            console.log('group==========>', group);
          })
        })
      }, err => {
        console.log(err);
      })
  }
}
