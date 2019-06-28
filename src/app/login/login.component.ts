import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  constructor(private route: ActivatedRoute,
    private router: Router, private _loginService: LoginService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required])
    });
  }


  onSubmit() {
    console.log("login details", this.loginForm);
    this._loginService.login(this.loginForm.value)
      .subscribe(data => {
        console.log("response of login user", data);
        this.router.navigate(['/']);
      }, error => {
        console.log(error);
      })
  }

}
