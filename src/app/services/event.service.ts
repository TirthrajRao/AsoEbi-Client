import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  addEvent(body, files: any, themeFiles: any) {
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
    // formdata.append('background', )
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        formdata.append("profile", files[i]);
      }
    }
    if (themeFiles.length) {
      for (var i = 0; i < themeFiles.length; i++) {
        formdata.append("background", themeFiles[i]);
      }
    }
    return this.http.post(config.baseApiUrl + "api/event/create-event", formdata);

  }

  updateEvent(id, body, files: any) {
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
    return this.http.put(config.baseApiUrl + "api/event/update-event/" + id, formdata)
  }

  addActivities(data) {
    console.log("activity data", data);
    return this.http.post(config.baseApiUrl + "api/activity/create-activity", data.activity);
  }

  updateActivity(data) {
    console.log("updated activity data", data);
    return this.http.put(config.baseApiUrl + "api/activity/update-activity", data);
  }


  addGroup(data) {
    console.log("group data", data);
    return this.http.post(config.baseApiUrl + "api/group/create-group", data)
  }

  updateGroup(data) {
    console.log("updated group data", data);
    return this.http.put(config.baseApiUrl + "api/group/update-group", data);
  }


  getMyevents() {
    return this.http.get(config.baseApiUrl + "api/event/myevent-list");
  }



  getEventDetails(id) {
    console.log("idddddddddddddddsssssssssssssssssss", id)
    return this.http.get(config.baseApiUrl + "api/event/" + id);
  }

  thankyouMessage(body, files: any) {
    console.log(body);
    let formdata = new FormData();
    formdata.append('message', body.message);
    formdata.append('eventId', body.eventId);
    if (files.length) {
      for (var i = 0; i < files.length; i++) {
        formdata.append("attachment", files[i]);
      }
    }
    return this.http.post(config.baseApiUrl + "api/message/add-message", formdata);

  }

  deleteEvent(id) {
    console.log("delete event id", id);
    return this.http.delete(config.baseApiUrl + "api/event/delete-event/" + id);
  }

  addToCart(groupId, activityId, eventId, item, gender) {
    console.log(groupId, activityId, eventId, item, gender);
    return this.http.post(config.baseApiUrl + "api/event/add-item", { groupId, activityId, eventId, item, gender });
  }

  getProducts(id) {
    console.log(id);
    return this.http.get(config.baseApiUrl + "api/event/cart-list/" + id);
  }


  joinEvent(id) {
    console.log("id of guest event", id);
    const eventId = {
      eventId: id
    }
    return this.http.post(config.baseApiUrl + "api/event/join-event", eventId);
  }
  removeCartItem(id) {
    console.log(id);
    return this.http.delete(config.baseApiUrl + "api/event/delete-item/" + id);
  }

  proceedToPay(data) {
    console.log(data);
    return this.http.put(config.baseApiUrl + "api/event/update-item", data);
  }

  finalPaymentDetails(id) {
    return this.http.get(config.baseApiUrl + "api/event/final-list/" + id);
  }
  makeFinalPayment(data) {
    console.log(data);
    return this.http.post(config.baseApiUrl + "api/event/order-checkout", data);
  }


  // Admin Panel
  dashBoardCount() {
    return this.http.get(config.baseApiUrl + "api/event/admin-dashboard-count");
  }
  allEventList(){
    return this.http.get(config.baseApiUrl+"api/event/event-list");
  }
  adminEventDetails(id){
    console.log(id);
    return this.http.get(config.baseApiUrl+"api/event/event-detail/" + id);
  }
  getUserList(){
    return this.http.get(config.baseApiUrl+"api/user/user-list");
  }
}
