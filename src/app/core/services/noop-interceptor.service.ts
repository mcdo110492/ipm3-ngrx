import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";

import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //Parse the json string in the localstorage to json object or null
    const obj = JSON.parse(localStorage.presence || null);

    //get the token in the obj if it exist or not pass the empty value
    const authHeader = (obj) ? obj.token : '';


    //set the header to authorization header in every request
    const authRequest = req.clone({setHeaders: {Authorization: `Bearer ${authHeader}` }});

    //Transform and handle all the http client request
    return next
            .handle(authRequest);

  }
  
}