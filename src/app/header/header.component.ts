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

  currentUser = JSON.parse(localStorage.getItem('isUserLoggedIn'));
  adminUser = JSON.parse(localStorage.getItem('userRole'));
  constructor(private _loginService: LoginService,private route: ActivatedRoute,
    private router: Router) {
      console.log("current user in header component", this.currentUser);
      if(!this.currentUser){
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
