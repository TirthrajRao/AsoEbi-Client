import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'client';
  title = 'Aso-Ebi';
  currentUser = JSON.parse(localStorage.getItem('isUserLoggedIn'));
}
