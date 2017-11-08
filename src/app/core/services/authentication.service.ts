import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { Store } from "@ngrx/store";

import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { switchMap, catchError } from "rxjs/operators";

import { environment } from "./../../../environments/environment";

import * as loginActions from "./../../features/login/actions/login.actions";
import * as fromLogin from "./../../features/login/reducers/login.reducers";

import * as mainContentActions from './../../main-content/actions/main-content.actions';
import * as fromMain from "./../../main-content/reducers/main-content.reducers";

@Injectable()
export class AuthenticationService {

  private _restEndPoint : string = environment.endPoint;

  constructor(private _http : HttpClient, private _router : Router, private _store : Store<fromLogin.State>, private _mainStore : Store<fromMain.State>) { }

  authenticateGuard() : Observable<boolean>{

    return this._http.get(`${this._restEndPoint}/routeAuthenticate`)
            .pipe(
              switchMap((response) => { return of(true)}),
              catchError(() => { 
                this._store.dispatch( new loginActions.Logout() ); 
                this._mainStore.dispatch(new mainContentActions.IsLoginPage(true));
                this._router.navigateByUrl('/login');
                return of(false); 
              })
            );
            
  }

}
