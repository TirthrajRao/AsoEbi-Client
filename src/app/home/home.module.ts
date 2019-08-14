import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { HomeComponent } from '../home/home.component';
import { CreateEventComponent } from '../create-event/create-event.component';
import { MyEventComponent } from '../my-event/my-event.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ViewEventComponent } from '../view-event/view-event.component';
import { ThankYouMessageComponent } from '../thank-you-message/thank-you-message.component';
import { MyCartComponent } from '../my-cart/my-cart.component';
import { PaymentComponent } from '../payment/payment.component';
import { HeaderComponent } from '../header/header.component';
import { BankDetailsComponent } from '../bank-details/bank-details.component';
import { AdminUserListComponent } from '../admin-user-list/admin-user-list.component';
import { AdminEventDetailsComponent } from '../admin-event-details/admin-event-details.component';
import { AdminDashboardComponent } from '../admin-dashboard/admin-dashboard.component';
import { TotalEventsComponent } from '../total-events/total-events.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { ShareButtonModule } from '@ngx-share/button';
import { ShareModule } from '@ngx-share/core';
import{AuthGuard} from '../auth.guard';


const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'createEvent',
        component: CreateEventComponent,
      },
      {
        path: 'editEvent/:id',
        component: CreateEventComponent,
      },
      {
        path: 'myEvent',
        component: MyEventComponent,
      },
      {
        path: 'reset-password',
        component: ResetPasswordComponent,
      },
      {
        path: 'view-event/:id',
        component: ViewEventComponent,
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
        path: 'bankDetails',
        component: BankDetailsComponent
      },
      // Admin Panel
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

]

@NgModule({
  declarations: [
    HomeComponent,
    CreateEventComponent,
    MyEventComponent,
    HeaderComponent,
    ResetPasswordComponent,
    ViewEventComponent,
    ThankYouMessageComponent,
    MyCartComponent,
    PaymentComponent,
    BankDetailsComponent,
    AdminDashboardComponent,
    TotalEventsComponent,
    AdminEventDetailsComponent,
    AdminUserListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    JwSocialButtonsModule,
    ShareButtonModule,
    ShareModule
  ],
})
export class HomeModule { }
