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
    component: DisplayPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signUp',
    component: SignupComponent,
    pathMatch: 'full'
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
  },
  // {
  //   path: "home",
  //   component: HomeComponent,
  //   // canActivate: [AuthGuard],
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'home',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'createEvent',
  //       component: CreateEventComponent,
  //     },
  //     {
  //       path: 'editEvent/:id',
  //       component: CreateEventComponent,
  //     },
  //     {
  //       path: 'myEvent',
  //       component: MyEventComponent,
  //     },
  //     {
  //       path: 'reset-password',
  //       component: ResetPasswordComponent,
  //     },
  //     {
  //       path: 'view-event/:id',
  //       component: ViewEventComponent,
  //     },
  //     {
  //       path: 'thank-you/:id',
  //       component: ThankYouMessageComponent
  //     },
  //     {
  //       path: 'my-cart/:id',
  //       component: MyCartComponent
  //     },
  //     {
  //       path: 'payment/:id',
  //       component: PaymentComponent
  //     },
  //     {
  //       path: 'admin-dashboard',
  //       component: AdminDashboardComponent
  //     },
  //     {
  //       path: 'total-event',
  //       component: TotalEventsComponent
  //     },
  //     {
  //       path: 'admin-eventDetails/:id',
  //       component: AdminEventDetailsComponent
  //     },
  //     {
  //       path: 'total-user',
  //       component: AdminUserListComponent
  //     }
  //   ]
  // }
];

@NgModule({
  // { useHash: true }
  imports: [RouterModule.forRoot(routes, )], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
