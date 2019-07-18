import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {

  userList: any=[]; 
  constructor(private route: ActivatedRoute,
    private router: Router,private _eventService: EventService) { }

  ngOnInit() {
    this.getUserList();
  }



  getUserList(){
    this._eventService.getUserList()
    .subscribe((data:any)=>{
      console.log(data);
      this.userList = data.data;
      console.log(this.userList);
    }, err=>{
      console.log(err);
    })
  }

}
