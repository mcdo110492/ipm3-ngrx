import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, withLatestFrom, tap } from "rxjs/operators";

import * as health from './../actions/employee-health.actions';
import * as fromRoot from './../../reducers';
import { EmployeeHealth } from './../models/employee-health.model';

import { EmployeeHealthInformationService } from "./../employee-health-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeHealthInformationEffects {

    constructor(private _service : EmployeeHealthInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getHealth$ : Observable<Action> = this._actions$
        .ofType(health.GET_HEALTH)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId)
            ),
            switchMap( ([action, employeeId]) => {
                return this._service.getHealth(employeeId)
                .pipe(
                    map((response) => new health.GetHealthSuccess(response.data) ),
                    catchError(err => of(new health.GetHealthError(err) ))
                )
            })
        );
        
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<health.GetHealthError>(health.GET_HEALTH_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)})
                 );
                 

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<health.SaveHealth>(health.SAVE_HEALTH)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                
                return this._service.updateHealth(payload)
                .pipe(
                    map((response) =>  new health.SaveHealthSuccess(payload) ),
                    catchError((err) => of( new health.GetHealthError(err) )),
                    tap(() => this._loader.closeDialog())
                )
            })
        );
        

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(health.SAVE_HEALTH_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); })
                       );
                       
                                 
}
