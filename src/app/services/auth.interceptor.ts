import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs/';
import { map, catchError,tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/do';




@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    constructor(private route: ActivatedRoute,
        private router: Router,){}
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
                // event['body'] = event.body['result'];
                return event;
              }),
              catchError((error: HttpErrorResponse) => {
                  console.log("interceptorsssssssss error by meeeeeeeeeee", error);
                if (error.status === 401) {
                    const idtoken = (localStorage.removeItem('currentUser'));
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
                // event['body'] = event.body['result'];
                return event;
              }),
              catchError((error: HttpErrorResponse) => {
                  console.log("interceptorsssssssss error by meeeeeeeeeee", error);
                if (error.status === 401) {
                  this.router.navigate(['/login']);
                }
                return throwError('backend comm error');
              })
            );
        };

    }
}