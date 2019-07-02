import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import {LoaderService} from '../services/loader.service';
import { finalize } from "rxjs/operators";


@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const idtoken = JSON.parse(localStorage.getItem("currentUser"));
        console.log("interceptor login user token", idtoken);

        if (idtoken) {
            const cloned = req.clone({
                headers: req.headers.set("authorization",
                    idtoken)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }

    }
}

// @Injectable()
// export class LoaderInterceptor implements HttpInterceptor {
//     constructor(public loaderService: LoaderService) { }
//     intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         console.log("api start ")
//         // this.loaderService.show();
//         document.body.classList.add('load');
//         return next.handle(req).pipe(
//             finalize(() => {
//                 console.log("api end");
//                 // this.loaderService.hide()
//                 document.body.classList.remove('load');
//             })
//         );
//     }
// }