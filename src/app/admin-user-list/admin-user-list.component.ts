import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  userList: any = [];

  constructor(private router: Router, private _eventService: EventService, private alerService: AlertService) { }

  ngOnInit() {
    this.getUserList();
  }

  /**
   * Total usersList which use Aso_Ebi website
   */
  getUserList() {
    this._eventService.getUserList()
      .subscribe((data: any) => {
        console.log(data);
        this.userList = data.data;
        console.log(this.userList);
      }, err => {
        console.log(err);
      })
  }

}
