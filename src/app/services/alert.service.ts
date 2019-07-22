import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  getSuccess(message){
    console.log(message);
    Swal.fire({
      type: 'success',
      title: "congo" + message,
      showConfirmButton: false,
      timer: 2000
    })
  }
}
