import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }




  addEvent(body, files: any) {
    console.log("event detailsssssss", body);
    console.log("filessssss name ", files);
    let formdata = new FormData();
    formdata.append('eventTitle', body.eventTitle);
    formdata.append('eventType', body.eventType);
    formdata.append('startDate', body.startDate);
    formdata.append('endDate', body.endDate);
    formdata.append('hashTag', body.hashTag);
    formdata.append('deadlineDate', body.deadlineDate);
    formdata.append('isPublic', body.isPublic);
    formdata.append('isLogistics', body.isLogistics);
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        formdata.append("profile", files[i]);
      }
    }
    return this.http.post(config.baseApiUrl + "api/newevent", formdata);

  }

  addActivities(data) {
    console.log("activity data", data);
    return this.http.post(config.baseApiUrl + "api/newevent/activity", data.activity);
  }


  addGroup(data){
    console.log("group data",data);
    return this.http.post(config.baseApiUrl + "api/newevent/activity/group", data)
  }


  getMyevents(){
    return this.http.get(config.baseApiUrl + "api/event/myevent-list");
  }
}
