import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';






// import { $ } from 'protractor';
declare var $ : any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _loginService: LoginService,private route: ActivatedRoute,
    private router: Router) { }

  currentuser = JSON.parse(localStorage.getItem('isUserLoggedIn'));


  ngOnInit() {
    console.log("current user in header component", this.currentuser);
    if(!this.currentuser){
      $('#navbarSupportedContent').css({'display':'none'});
    }
  }


  logout(){
      this._loginService.logout();
      this.router.navigate(['/login']);
    
  }

}
