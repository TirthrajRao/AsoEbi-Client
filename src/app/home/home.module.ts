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
const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
    // canActivate: [AuthGuard],
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
      // {
      //   path: 'admin-dashboard',
      //   component: AdminDashboardComponent
      // },
      // {
      //   path: 'total-event',
      //   component: TotalEventsComponent
      // },
      // {
      //   path: 'admin-eventDetails/:id',
      //   component: AdminEventDetailsComponent
      // },
      // {
      //   path: 'total-user',
      //   component: AdminUserListComponent
      // }
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
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule
  ],
})
export class HomeModule { }
