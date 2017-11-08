import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, tap, filter } from "rxjs/operators";

import * as club from './../actions/employee-club.actions';
import * as fromRoot from './../../reducers';
import { EmployeeClub } from './../models/employee-club.model';

import { EmployeeClubInformationService } from "./../employee-club-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeClubInformationEffects {

    constructor(private _service : EmployeeClubInformationService, 
        private _actions$ : Actions, 
        private _store$ : Store<fromRoot.State>, 
        private _loader : LoaderSpinnerService, 
        private _toastr : ToastrService){}

    @Effect()
    loadClub$ : Observable<Action> = this._actions$
    .ofType(club.LOAD)
    .pipe(
        withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        ),
        switchMap( ([action, employeeId]) => {
            return this._service.getClub(employeeId)
            .pipe(
                map((response) => new club.LoadSuccess(response.data) ),
                catchError(err => of(new club.ClubError(err) ))
            )
        })
    );
    



    @Effect()
    save$ : Observable<Action> = this._actions$
    .ofType<club.SaveClub>(club.SAVE_CLUB)
    .pipe(
        map( (action) => action.payload),
        withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        ),
        switchMap(([payload, employeeId]) => {
    
            this._loader.openDialog();
            if(payload.employeeClubId == 0){
            
                
                return this._service.saveClub(payload,employeeId)
                .pipe(
                    map((response) =>  new club.SaveClubSuccess() ),
                    catchError((err) => of( new club.ClubError(err) )),
                    tap(() => this._loader.closeDialog())
                )
                
            }
            else {
    
                return this._service.updateClub(payload)
                .pipe(
                    map((response) =>  new club.SaveClubSuccess() ),
                    catchError((err) => of( new club.ClubError(err) )),
                    tap(() => this._loader.closeDialog())
                )
            }
    
            
        })
    );
    

    @Effect()
    saveSuccess$  = this._actions$
    .ofType(club.SAVE_CLUB_SUCCESS)
    .pipe(
        tap(() => { this._toastr.saveSuccess(); }),
        mergeMap(() => {
            return [
                new club.Load(),
                new club.ClearSelected()
            ];
        })
    );
    

    @Effect()
    error$ = this._actions$
            .ofType<club.ClubError>(club.CLUB_ERROR)
            .pipe(
                map((action) => action.payload),
                tap((payload) => { this._toastr.errorHandler(payload)}),
                filter( payload => payload.status == 422),
                map(() => new club.ClearSelected() )
            );
            
}