import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {HomeComponent} from './home/home.component';
import {CreateEventComponent} from './create-event/create-event.component';
import {EditEventComponent} from './edit-event/edit-event.component';
import {MyEventComponent} from './my-event/my-event.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: '',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent,
     pathMatch:'full'
  },
  {
    path: 'signUp',
    component: SignupComponent,
    pathMatch:'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch:'full'
  },
  {
    path: 'createEvent',
    component: CreateEventComponent,
    pathMatch:'full'
  },
  {
    path: 'editEvent',
    component: EditEventComponent,
    pathMatch:'full'
  },
  {
    path: 'myEvent',
    component: MyEventComponent,
    pathMatch:'full'
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
