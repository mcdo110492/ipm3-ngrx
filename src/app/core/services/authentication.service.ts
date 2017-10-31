import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { Store } from "@ngrx/store";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

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
            .switchMap((response) => { return Observable.of(true)})
            .catch(() => { 
              this._store.dispatch( new loginActions.Logout() ); 
              this._mainStore.dispatch(new mainContentActions.IsLoginPage(true));
              this._router.navigateByUrl('/login');
              return Observable.of(false); 
            });

  }

}
