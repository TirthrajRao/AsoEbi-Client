import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  constructor(private http: HttpClient) { }

  /**
   * @param {Object} body 
   * @param {Object} files 
   * @param {Object} themeFiles
   * Create new event
   */
  addEvent(body, files: any, themeFiles: any) {
    console.log("event detailsssssss", body);
    console.log("filessssss name ", files);
    let formdata = new FormData();
    formdata.append('eventTitle', body.eventTitle);
    formdata.append('eventType', body.eventType);
    formdata.append('hashTag', body.hashTag);
    formdata.append('deadlineDate', body.deadlineDate);
    formdata.append('isPublic', body.isPublic);
    formdata.append('isLogistics', body.isLogistics);
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("profile", files[i]);
      }
    }
    if (themeFiles.length) {
      for (let i = 0; i < themeFiles.length; i++) {
        formdata.append("background", themeFiles[i]);
      }
    }
    return this.http.post(config.baseApiUrl + "api/event", formdata);
  }

  /**
   * @param {String} id 
   * @param {Object} body 
   * @param {Object} files
   * Update created event if any changes accrued  
   */
  updateEvent(id, body, files: any) {
    let formdata = new FormData();
    formdata.append('eventTitle', body.eventTitle);
    formdata.append('eventType', body.eventType);
    // formdata.append('startDate', body.startDate);
    // formdata.append('endDate', body.endDate);
    formdata.append('hashTag', body.hashTag);
    formdata.append('deadlineDate', body.deadlineDate);
    formdata.append('isPublic', body.isPublic);
    formdata.append('isLogistics', body.isLogistics);
    formdata.append('eventId', id)
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("profile", files[i]);
      }
    }
    return this.http.put(config.baseApiUrl + "api/event", formdata)
  }

  /**
   * @param {Object} data
   * Add new activity in event 
   */
  addActivities(data) {
    console.log("activity data", data);
    return this.http.post(config.baseApiUrl + "api/activity", data.activity);
  }

  /**
   * @param {Object} data
   * Update created activity if any changes accrued 
   */
  updateActivity(data) {
    console.log("updated activity data", data);
    return this.http.put(config.baseApiUrl + "api/activity", data);
  }

  removeActivity(activityId) {
    console.log("data of delete activity", activityId)
    return this.http.post(config.baseApiUrl + "api/activity-delete", activityId);
  }
  removeGroup(id) {
    return this.http.put(config.baseApiUrl + "api/group-delete", id);
  }
  removeMaleItem(itemId, groupId) {
    const body = {
      itemId: itemId,
      groupId: groupId
    }
    return this.http.put(config.baseApiUrl + "api/group/delete-item",body)
  }
  /**
   * @param {Object} data
   * Add new group releated to it's activity and event 
   */
  addGroup(data) {
    console.log("group data", data);
    return this.http.post(config.baseApiUrl + "api/group", data)
  }

  /**
   * @param {Object} data
   * Update group of any particular activity if any changes accrued 
   */
  updateGroup(data) {
    console.log("updated group data", data);
    return this.http.put(config.baseApiUrl + "api/group/", data);
  }

  /**
   * Get event list which created by user 
   */
  getMyevents() {
    return this.http.get(config.baseApiUrl + "api/event/myevent-list");
  }

  /**
   * @param {string} id
   * Get details of any particular event  
   */
  getEventDetails(id) {
    console.log("idddddddddddddddsssssssssssssssssss", id)
    return this.http.get(config.baseApiUrl + "api/event/" + id);
  }

  /**
   * @param {Object} body 
   * @param {Object} files
   * Create thanks giving message for guest  
   */
  thankyouMessage(body, files: any) {
    console.log(body);
    let formdata = new FormData();
    formdata.append('message', body.message);
    formdata.append('eventId', body.eventId);
    if (files.length) {
      for (let i = 0; i < files.length; i++) {
        formdata.append("attachment", files[i]);
      }
    }
    return this.http.post(config.baseApiUrl + "api/message/add-message", formdata);
  }

  getThankyouMessage(id){
    return this.http.get(config.baseApiUrl + "api/messagelist/"+ id);
  }

  /**
   * @param {String} id 
   * Delete event
   */
  deleteEvent(id) {
    console.log("delete event id", id);
    return this.http.delete(config.baseApiUrl + "api/event-delete/" + id);
  }

  /**
   * @param {String} groupId 
   * @param {String} activityId 
   * @param {String} eventId 
   * @param {Object} item 
   * @param {Key} gender
   * Items which guest want to buy in addToCart 
   */
  addToCart(eventId, itemId) {
    console.log(eventId, itemId);
    return this.http.post(config.baseApiUrl + "api/cart", { eventId, itemId });
  }

  /**
   * @param {String} id
   * Get all items list which guest want to buy 
   */
  getProducts(id) {
    console.log(id);
    return this.http.get(config.baseApiUrl + "api/event/cart-list/" + id);
  }

  /**
   * @param {String} id
   * Join invited event for guest 
   */
  joinEvent(id) {
    console.log("id of guest event", id);
    const eventId = {
      eventId: id
    }
    return this.http.post(config.baseApiUrl + "api/event/join-event", eventId);
  }
  /**
   * @param {String} id
   * Remove cart item which added in all my cart items 
   */
  removeCartItem(id) {
    console.log(id);
    return this.http.delete(config.baseApiUrl + "api/cart?itemId=" + id);
  }

  /**
   * @param {Object} data
   * Proceed for final checkout of myCart items 
   */
  proceedToPay(data) {
    console.log(data);
    return this.http.put(config.baseApiUrl + "api/event/update-item", data);
  }

  /**
   * @param {String} id
   * Get all payment details with final price, quantity and subtotal 
   */
  finalPaymentDetails(id) {
    return this.http.get(config.baseApiUrl + "api/event/final-list/" + id);
  }

  /**
   * @param {Object} data 
   * Final payment of all item list
   */
  makeFinalPayment(data) {
    console.log(data);
    return this.http.post(config.baseApiUrl + "api/event/order-checkout", data);
  }

  /**
   * @param {Key} searchText
   * To get search event of all public events 
   */
  getPublicEvents(searchText?) {
    if (searchText) {
      const keyword = searchText;
      return this.http.get(config.baseApiUrl + "api/event/public-event?keyword=" + keyword);
    } else {
      return this.http.get(config.baseApiUrl + "api/event/public-event");
    }
  }

  getBankDetails() {
    return this.http.get(config.baseApiUrl + "api/accountList");
  }

  getCollections(id) {

    return this.http.get(config.baseApiUrl + "api/event-collection?eventId=" + id);
  }
  totalAmount(id) {
    return this.http.get(config.baseApiUrl + "api/event-donation?eventId=" + id);
  }

  guestList(id) {
    return this.http.get(config.baseApiUrl + "api/guest?eventId=" + id);
  }

  // Admin Panel//

  /**
   * Get admin dashboard details
   */
  dashBoardCount() {
    return this.http.get(config.baseApiUrl + "api/event/admin-dashboard-count");
  }
  /**
   * Get all events list which created by all users 
   */
  allEventList() {
    return this.http.get(config.baseApiUrl + "api/event/event-list");
  }

  /**
   * @param {String} id
   * Get any particular event details  
   */
  adminEventDetails(id) {
    console.log(id);
    return this.http.get(config.baseApiUrl + "api/event/event-detail/" + id);
  }

  singleGuestItemDetails(id){
    return this.http.get(config.baseApiUrl +"api/event-transaction?eventId="+ id);
  }

  /**
   * Get all Users list 
   */
  getUserList() {
    return this.http.get(config.baseApiUrl + "api/user/user-list");
  }

  afterEventMessageDetail(eventId, messageData) {
    const data = {
      eventId: eventId,
      messageDate: messageData.messageDate,
      messagePreference: messageData.messagePreferance,
      message: messageData.thanksMessage
    }
    return this.http.put(config.baseApiUrl + "api/after-eventmsg", data);

  }
  selectBankAccount(data){
   return this.http.put(config.baseApiUrl+ "api/bank-account", data);
  }

  getTotalCollection(){
   return this.http.get(config.baseApiUrl + "api/mycollection");
  }
}
