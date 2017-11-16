import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, withLatestFrom, tap, filter } from "rxjs/operators";

import * as empPersonal from './../actions/employee-personal.actions';
import * as fromRoot from './../../reducers';
import { EmployeePersonal } from './../models/employee-personal.models';

import { EmployeePersonalInformationService } from "./../employee-personal-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeePersonalInformationEffects {

    constructor(private _service : EmployeePersonalInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getPersonal$ : Observable<Action> = this._actions$
        .ofType(empPersonal.GET_PERSONAL)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId)
            ),
            switchMap( ([action, employeeId]) => {
                return this._service.getPersonal(employeeId)
                .pipe(
                    map((response) => new empPersonal.GetPersonalSuccess(response.data) ),
                    catchError(err => of(new empPersonal.GetPersonalError(err) ))
                )
    
            })
        );
        
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<empPersonal.GetPersonalError>(empPersonal.GET_PERSONAL_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter(payload => payload.status == 404),
                    tap(() => this._router.navigateByUrl('404/page-not-found'))
                 );


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<empPersonal.SavePersonal>(empPersonal.SAVE_PERSONAL)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {

                this._loader.openDialog();
                
                return this._service.updatePersonal(payload)
                .pipe(
                    map((response) =>  new empPersonal.SavePersonalSuccess(payload) ),
                    catchError((err) => of( new empPersonal.GetPersonalError(err) )),
                    tap(() => this._loader.closeDialog())
                )

            })
        );

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(empPersonal.SAVE_PERSONAL_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); })
                       );
                       
                                 
}
