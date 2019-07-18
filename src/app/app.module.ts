import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {LoginService} from './services/login.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { MyEventComponent } from './my-event/my-event.component';
import { HeaderComponent } from './header/header.component';
import { AuthInterceptor } from './services/auth.interceptor';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoaderComponent } from './loader/loader.component';
import {LoaderService} from './services/loader.service';
import { ViewEventComponent } from './view-event/view-event.component';
import { ThankYouMessageComponent } from './thank-you-message/thank-you-message.component';
import { GuestEventComponent } from './guest-event/guest-event.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PaymentComponent } from './payment/payment.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { TotalEventsComponent } from './total-events/total-events.component';
import { ChartsModule } from 'ng2-charts';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AdminEventDetailsComponent } from './admin-event-details/admin-event-details.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';




let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("265692874005-9q5lu0gc23u3los6fisqmvgiuo7bp99s.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("350939005533804")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    CreateEventComponent,
    EditEventComponent,
    MyEventComponent,
    HeaderComponent,
    ResetPasswordComponent,
    LoaderComponent,
    ViewEventComponent,
    ThankYouMessageComponent,
    GuestEventComponent,
    MyCartComponent,
    PaymentComponent,
    AdminDashboardComponent,
    TotalEventsComponent,
    ForgotPasswordComponent,
    AdminEventDetailsComponent,
    AdminUserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    MatProgressSpinnerModule,
    CKEditorModule,
    ChartsModule
  ],
  providers: [LoginService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    ],
  bootstrap: [AppComponent]
})


export class AppModule { }
