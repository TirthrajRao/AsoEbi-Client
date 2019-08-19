import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { GuestEventComponent } from './guest-event/guest-event.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TotalEventsComponent } from './total-events/total-events.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminEventDetailsComponent } from './admin-event-details/admin-event-details.component';
import { DisplayPageComponent } from './display-page/display-page.component';
import {HomeModule} from './home/home.module';

/**
 * Routing of all pages 
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: 'display-page',
    pathMatch: 'full'
  },
  {
    path: 'display-page',
    component: DisplayPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signUp',
    component: SignupComponent
  },
  {
    path: 'welcome-guest/:id',
    component: GuestEventComponent
  },
  {
    path: 'forgot-password/:id',
    component: ForgotPasswordComponent
  },
  {
    path: 'home',
    loadChildren: ()=> HomeModule 
  }
];

@NgModule({
  // { useHash: true }
  imports: [RouterModule.forRoot(routes, { useHash: true })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
