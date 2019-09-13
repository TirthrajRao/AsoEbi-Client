import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  /**
   * @param {String} message
   * Alert for all success response 
   */
  getSuccess(message) {
    console.log(message);
    Swal.fire({
      type: 'success',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })
  }

  /**
   * @param {String} message
   * Alert for all error response 
   */
  getError(message) {
    console.log(message);
    Swal.fire({
      type: 'error',
      title: message,
      showConfirmButton: false,
      timer: 5000
    })
  }
}
