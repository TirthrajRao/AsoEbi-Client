import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs/';
import { map, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';
import Swal from 'sweetalert2';





@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private route: ActivatedRoute,
    private router: Router, ) { }
  /**
   * 
   * @param req 
   * @param next
   * When user request pass accessToken with all request and if any error display alert on every error 
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const idtoken = JSON.parse(localStorage.getItem('currentUser'));
    console.log("interceptor login user token", idtoken);

    if (idtoken) {
      const cloned = req.clone({
        headers: req.headers.set("authorization",
          idtoken)
      });
      return next.handle(cloned)
        .pipe(
          map((event: HttpResponse<any>) => {
            console.log("interceptorsssssssssss events mdse ???", event);
            // Swal.fire({type: 'success',title: 'Password Change Successfully',showConfirmButton:false,timer: 2000})
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            console.log("interceptorsssssssss error by meeeeeeeeeee", error);
            let errorMessage = error.error.message;
            console.log("error in interceptor", errorMessage);
            if (error.status === 401) {
              const idtoken = (localStorage.removeItem('currentUser'));
              Swal.fire({
                type: 'error',
                title: "sorry" + errorMessage,
                showConfirmButton: false,
                timer: 2000
              })
              this.router.navigate(['/login']);
            }
            return throwError('backend comm error');
          })
        );
    } else {
      return next.handle(req)
        .pipe(
          map((event: HttpResponse<any>) => {
            console.log("interceptorsssssssssss events mdse ???", event);
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            console.log("interceptorsssssssss error in login", error);
            let errorMessage = error.error.message;
            console.log("dkjsbkjsbbskfbdsbfbdsf", errorMessage);
            if (error.status === 401) {
              /**
               * Alert of every error response
               */
              Swal.fire({
                type: 'error',
                title: "sorry" + errorMessage,
                showConfirmButton: false,
                timer: 2000
              })
              this.router.navigate(['/login']);
            }
            return throwError('backend comm error');
          })
        );
    };

  }
}