import { Component } from '@angular/core';
import { Router, ActivatedRoute, Event, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'client';
  title = 'Aso-Ebi';

  constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe((routerEvents: Event)=>{
      this.checkRouterEvent(routerEvents);
    })
  }

  

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
      setTimeout(function(){
        $('#loading').fadeOut('slow', function(){
          $('body').removeAttr('style');
        });
      },100);
    }
  }
}
