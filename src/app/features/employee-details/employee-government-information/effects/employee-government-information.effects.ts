import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, withLatestFrom, tap } from "rxjs/operators";

import * as government from './../actions/employee-government.actions';
import * as fromRoot from './../../reducers';
import { EmployeeGovernment } from './../models/employee-government.model';

import { EmployeeGovernmentInformationService } from "./../employee-government-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeGovernmentInformationEffects {

    constructor(private _service : EmployeeGovernmentInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getGovernment$ : Observable<Action> = this._actions$
        .ofType(government.GET_GOVERNMENT)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId),
            ),
            switchMap( ([action, employeeId]) => {
                return this._service.getGovernment(employeeId)
                .pipe(
                    map((response) => new government.GetGovernmentSuccess(response.data) ),
                    catchError(err => of(new government.GetGovernmentError(err) ))
                )    
            })
        );
        
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<government.GetGovernmentError>(government.GET_GOVERNMENT_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)})
                 );
                

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<government.SaveGovernment>(government.SAVE_GOVERNMENT)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                
                return this._service.updateGovernment(payload)
                .pipe(
                    map((response) =>  new government.SaveGovernmentSuccess(payload) ),
                    catchError((err) => of( new government.GetGovernmentError(err) )),
                    tap(() => this._loader.closeDialog())
                )
            })
        );
        

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(government.SAVE_GOVERNMENT_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); })
                       );
                       
                                 
}
