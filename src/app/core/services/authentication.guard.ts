import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad ,ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { first } from "rxjs/operators";

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private _service : AuthenticationService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this._service.authenticateGuard()
           .pipe( first() );

  }

  canActivateChild(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean> {

    return this._service.authenticateGuard()
           .pipe( first() );

  }

  canLoad() : Observable<boolean> {

    return this._service.authenticateGuard()
           .pipe( first() );

  }


}
