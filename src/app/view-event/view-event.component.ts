import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-view-event',
  templateUrl: './view-event.component.html',
  styleUrls: ['./view-event.component.css']
})
export class ViewEventComponent implements OnInit {

  private sub: any;
  private eventId: any;
  allDetailsofEvent= [];

  constructor(private route: ActivatedRoute,
    private router: Router,private _eventService: EventService) {
      this.sub = this.route.params.subscribe(params=>{
        this.eventId = params.id;
        console.log(this.eventId);
        this.viewDetailsOfEvent(this.eventId);
      })
     }

  ngOnInit() {
  }



  viewDetailsOfEvent(eventId){
    this._eventService.getEventDetails(eventId)
    .subscribe((data: any)=>{
      console.log("response of details event", data);
      this.allDetailsofEvent.push(data.data);
      console.log("response store in variable", this.allDetailsofEvent);
    }, err =>{
      console.log(err);
    })
  }

  editEventDeatils(id){
    console.log(id);
    this.router.navigate(['/home/editEvent/',id])

  }

}
