import { Component, OnInit } from '@angular/core';
import { YahooService } from '../services/yahoo.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: YahooService, private router: Router) { }
  profile: any;
  async ngOnInit() {

    // const client = await this.authService.getAuth0Client();

    // // Handle the redirect from Auth0
    // const result = await client.handleRedirectCallback();
    
    // // Get the URL the user was originally trying to reach
    // const targetRoute =
    //   result.appState && result.appState.target ? result.appState.target : '';
    //   console.log(targetRoute);

    // // Update observables
    // this.authService.isAuthenticated.next(await client.isAuthenticated());
    // this.authService.profile.next(await client.getUser())

    // // Redirect away
    // // this.router.navigate([targetRoute]);

    // this.authService.profile.subscribe(profile => (this.profile = profile));

    const client = await this.authService.getAuth0Client();

    // Handle the redirect from Auth0
    const result = await client.handleRedirectCallback();
    console.log("result of login user", result);
    
    // Get the URL the user was originally trying to reach
    const targetRoute =
      result.appState && result.appState.target ? result.appState.target : '';

    // Update observables
    this.authService.isAuthenticated.next(await client.isAuthenticated());
    this.authService.profile.next(await client.getUser())

    // Redirect away
    this.router.navigate(['/home/myEvent']);
  }

}
