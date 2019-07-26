import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class YahooService {

  constructor(private router: Router){

  }

  isAuthenticated = new BehaviorSubject(false);
  profile = new BehaviorSubject<any>(null);

  private auth0Client: Auth0Client;

  // Auth0 application configuration
  config = {
    domain: "dev-ste529jg.auth0.com",
    client_id: "fOh4QziRPZ5ibi2e6KwKoKbJk74ig3tm",
    redirect_uri: `http://localhost:4200/home`,
    response_type: 'token',
    callback: 'http://localhost:4200/home',
  };

  /**
   * Gets the Auth0Client instance.
   */
  async getAuth0Client(): Promise<Auth0Client> {
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client(this.config);
      console.log(this.auth0Client);
      // Provide the current value of isAuthenticated
      this.isAuthenticated.next(await this.auth0Client.isAuthenticated());
      // Whenever isAuthenticated changes, provide the current value of `getUser`
      this.isAuthenticated.subscribe(async isAuthenticated => {
        if (isAuthenticated) {
          this.profile.next(await this.auth0Client.getUser());
          this.router.navigate(['/home']);

          return;
        }

        this.profile.next(null);
      });
    }

    return this.auth0Client;
  }
}