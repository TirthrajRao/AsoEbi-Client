import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { MyEventComponent } from './my-event/my-event.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ViewEventComponent } from './view-event/view-event.component';
import { ThankYouMessageComponent } from './thank-you-message/thank-you-message.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { GuestEventComponent } from './guest-event/guest-event.component';
import { PaymentComponent } from './payment/payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TotalEventsComponent } from './total-events/total-events.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminEventDetailsComponent } from './admin-event-details/admin-event-details.component';
import { DisplayPageComponent } from './display-page/display-page.component';

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
    path: "home",
    component: HomeComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'createEvent',
        component: CreateEventComponent,
        // pathMatch:'full'
      },
      {
        path: 'editEvent/:id',
        component: CreateEventComponent,
        // pathMatch:'full'
      },
      {
        path: 'myEvent',
        component: MyEventComponent,
        // pathMatch:'full'
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
        // pathMatch:'full'
      },
      {
        path: 'view-event/:id',
        component: ViewEventComponent,
        // pathMatch:'full'
      },
      {
        path: 'thank-you/:id',
        component: ThankYouMessageComponent
      },
      {
        path: 'my-cart/:id',
        component: MyCartComponent
      },
      {
        path: 'payment/:id',
        component: PaymentComponent
      },
      {
        path: 'admin-dashboard',
        component: AdminDashboardComponent
      },
      {
        path: 'total-event',
        component: TotalEventsComponent
      },
      {
        path: 'admin-eventDetails/:id',
        component: AdminEventDetailsComponent
      },
      {
        path: 'total-user',
        component: AdminUserListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//, { useHash: true }
  exports: [RouterModule]
})
export class AppRoutingModule { }
