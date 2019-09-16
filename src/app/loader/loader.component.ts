import { Component, OnInit } from '@angular/core';
// import { $ } from 'protractor';
import { LoginService } from '../services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  userName = JSON.parse(sessionStorage.getItem('userName'));
  userRole = JSON.parse(sessionStorage.getItem('userRole'));
  manualLoginUser = JSON.parse(sessionStorage.getItem('currentUser'));
  isDisable: false;
  constructor(private _loginService: LoginService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    $(".new_event_menu").click(function () {
      $(".slider_menu").slideToggle();
    });

    // console.log("login with only manual", this.manualLoginUser);

    // $('#sideMenu').click(function () {
    //   $('.slider_menu').toggleClass('active');
    //   $('.main').toggleClass('active');
    //   $(this).toggleClass('active');

    //   if ($('.slider_menu').hasClass('active')) {
    //     $(this).find('i').addClass('fa-close');
    //     $(this).find('i').removeClass('fa-bars');
    //   } else {
    //     $(this).find('i').addClass('fa-bars');
    //     $(this).find('i').removeClass('fa-close');
    //   }
    // });

    // Add hover feedback on menu
    // $('#sideMenu').hover(function () {
    //   $('.slider_menu').toggleClass('hovered');
    // });
  }

  logout() {
    this._loginService.logout();
    this.router.navigate(['/display-page']);
  }

}
