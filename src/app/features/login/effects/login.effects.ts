import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, tap } from "rxjs/operators";

import * as loginActions from "./../actions/login.actions";
import * as mainActions from './../../../main-content/actions/main-content.actions';

import { LoginService } from "./../login.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";
import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";

@Injectable()
export class LoginEffects {

    constructor(
        private _service: LoginService,
        private _toastr : ToastrService,
        private _loader : LoaderSpinnerService,
        private _actions$: Actions
    ) {}

    @Effect()
        login$  = this._actions$
        .ofType<loginActions.LoginAuthenticate>(loginActions.LOGIN_AUTHENTICATE)
        .pipe(
            tap(() => this._loader.openDialog()),
            map((action) => action.payload),
            switchMap((payload) => { 

                return this._service.autheticateCredentials(payload) 
                .pipe(
                    map((response) => new loginActions.LoginSuccess(response) ),
                    catchError((err) => of(new loginActions.LoginError(err) ) )
                )

            })
        );

    @Effect()
        success$ = this._actions$
        .ofType<loginActions.LoginSuccess>(loginActions.LOGIN_SUCCESS)
        .pipe(
            map((response) => response.payload.status),
            switchMap((status) => { 
                this._loader.closeDialog();
               if(status == 200){
                 return of(new mainActions.IsLoginPage(false));
               }
               else if(status == 401){
                    this._toastr.custom('Invalid Credentials','Incorrect username or password','error');
                }
                else if(status == 403){
                    this._toastr.custom('Account Locked','This account has been locked. Contact your administrator','warning');
                }
                return of();
            })
        );
        

    @Effect({dispatch : false})
        error$ = this._actions$
        .ofType<loginActions.LoginError>(loginActions.LOGIN_ERROR)
        .pipe(
            tap(() => this._loader.closeDialog()),
            map((response) => this._toastr.errorHandler(response.payload.status))
        );
    
}
