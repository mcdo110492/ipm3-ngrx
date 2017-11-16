import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, tap, filter } from "rxjs/operators";

import * as educational from './../actions/employee-educational.actions';
import * as fromRoot from './../../reducers';
import { EmployeeEducational } from './../models/employee-educational.model';

import { EmployeeEducationalService } from "./../employee-educational.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeEducationalEffects {

    constructor(private _service : EmployeeEducationalService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService){}

    @Effect()
        loadLicenses$ : Observable<Action> = this._actions$
        .ofType(educational.LOAD)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId),
            ),
            switchMap( ([action, employeeId]) => {
                return this._service.getEducational(employeeId)
                .pipe(
                    map((response) => new educational.LoadSuccess(response.data) ),
                    catchError(err => of(new educational.EducationalError(err) ))
                )
            })
        );
        



    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<educational.SaveEducational>(educational.SAVE_EDUCATIONAL)
        .pipe(
            map( (action) => action.payload),
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId),
            ),
            switchMap(([payload, employeeId]) => {
    
                this._loader.openDialog();
                if(payload. employeeEducationId == 0){
                
                    
                    return this._service.saveEducational(payload,employeeId)
                    .pipe(
                        map((response) =>  new educational.SaveEducationalSuccess() ),
                        catchError((err) => of( new educational.EducationalError(err) )),
                        tap(() => this._loader.closeDialog())
                    )
                        
                }
                else {
    
                    return this._service.updateEducational(payload)
                    .pipe(
                        map((response) =>  new educational.SaveEducationalSuccess() ),
                        catchError((err) => of( new educational.EducationalError(err) )),
                        tap(() => this._loader.closeDialog())
                    )
                }
    
            })
        );
        

    @Effect()
        saveSuccess$  = this._actions$
        .ofType(educational.SAVE_EDUCATIONAL_SUCCESS)
        .pipe(
            tap(() => { this._toastr.saveSuccess(); }),
            mergeMap(() => {
                return [
                    new educational.Load(),
                    new educational.ClearSelected()
                ];
            })
        );
        

    @Effect()
        error$ = this._actions$
                 .ofType<educational.EducationalError>(educational.EDUCATIONAL_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422),
                    map(() => new educational.ClearSelected() )
                 );                 
                                 
}
