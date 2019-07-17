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

  currentuser = JSON.parse(localStorage.getItem('isUserLoggedIn'));
  constructor(private _loginService: LoginService,private route: ActivatedRoute,
    private router: Router) {
      console.log("current user in header component", this.currentuser);
      if(!this.currentuser){
        $('#navbarSupportedContent').css({'display':'none'});
      }
    }



  ngOnInit() {

    $('#menu-action').click(function() {
      $('.sidebar').toggleClass('active');
      $('.main').toggleClass('active');
      $(this).toggleClass('active');
    
      if ($('.sidebar').hasClass('active')) {
        $(this).find('i').addClass('fa-close');
        $(this).find('i').removeClass('fa-bars');
      } else {
        $(this).find('i').addClass('fa-bars');
        $(this).find('i').removeClass('fa-close');
      }
    });
    
    // Add hover feedback on menu
    $('#menu-action').hover(function() {
        $('.sidebar').toggleClass('hovered');
    });
  }


  logout(){
      this._loginService.logout();
      this.router.navigate(['/login']);
    
  }

}
