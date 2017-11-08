import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, tap, filter } from "rxjs/operators";

import * as license from './../actions/employee-license.actions';
import * as fromRoot from './../../reducers';
import { EmployeeLicense } from './../models/employee-licenses.models';

import { EmployeeLicensesService } from "./../employee-licenses.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeLicensesEffects {

    constructor(private _service : EmployeeLicensesService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService){}

    @Effect()
        loadLicenses$ : Observable<Action> = this._actions$
        .ofType(license.LOAD)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId)
            ),
            switchMap( ([action, employeeId]) => {
                return this._service.getLicenses(employeeId)
                .pipe(
                    map((response) => new license.LoadSuccess(response.data) ),
                    catchError(err => of(new license.LicenseError(err) ))
                )
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<license.SaveLicense>(license.SAVE_LICENSE)
        .pipe(
            map( (action) => action.payload),
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId)
            ),
            switchMap(([payload, employeeId]) => {
    
                this._loader.openDialog();
                if(payload.employeeLicenseId == 0){
                
                    
                    return this._service.saveLicense(payload,employeeId)
                    .pipe(
                        map((response) =>  new license.SaveLicenseSuccess() ),
                        catchError((err) => of( new license.LicenseError(err) )),
                        tap(() => this._loader.closeDialog())
                    )
        
                }
                else {
    
                    return this._service.updateLicense(payload)
                    .pipe(
                        map((response) =>  new license.SaveLicenseSuccess() ),
                        catchError((err) => of( new license.LicenseError(err) )),
                        tap(() => this._loader.closeDialog())
                    )
                }
    
                
            })
        );
        

    @Effect()
        saveSuccess$  = this._actions$
        .ofType(license.SAVE_LICENSE_SUCCESS)
        .pipe(
            tap(() => { this._toastr.saveSuccess(); }),
            mergeMap(() => {
                return [
                    new license.Load(),
                    new license.ClearSelected()
                ];
            })
        );
        

    @Effect()
        error$ = this._actions$
                 .ofType<license.LicenseError>(license.LICENSE_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422),
                    map(() => new license.ClearSelected() )
                 );
                 
                                              
}
