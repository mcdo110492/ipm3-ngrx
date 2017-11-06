import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

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
    .withLatestFrom(
        this._store$.select(fromRoot.getEmployeeId),
    )
    .switchMap( ([action, employeeId]) => {
        return this._service.getClub(employeeId)
        .map((response) => new club.LoadSuccess(response.data) )
        .catch(err => Observable.of(new club.ClubError(err) ))

    });



    @Effect()
    save$ : Observable<Action> = this._actions$
    .ofType<club.SaveClub>(club.SAVE_CLUB)
    .map( (action) => action.payload)
    .withLatestFrom(
        this._store$.select(fromRoot.getEmployeeId),
    )
    .switchMap(([payload, employeeId]) => {

        this._loader.openDialog();
        if(payload.employeeClubId == 0){
        
            
            return this._service.saveClub(payload,employeeId)
                .map((response) =>  new club.SaveClubSuccess() )
                .catch((err) => Observable.of( new club.ClubError(err) ))
                .do(() => this._loader.closeDialog())
            
        }
        else {

            return this._service.updateClub(payload)
            .map((response) => new club.SaveClubSuccess() )
            .catch((err) => Observable.of( new club.ClubError(err) ))
            .do(() => this._loader.closeDialog())
        }

        
    })

    @Effect()
    saveSuccess$  = this._actions$
    .ofType(club.SAVE_CLUB_SUCCESS)
    .do(() => { this._toastr.saveSuccess(); })
    .mergeMap(() => {
        return [
        new club.Load(),
        new club.ClearSelected()
        ];
    })

    @Effect()
    error$ = this._actions$
            .ofType<club.ClubError>(club.CLUB_ERROR)
            .map((action) => action.payload)
            .do((payload) => { this._toastr.errorHandler(payload)})
            .filter( payload => payload.status == 422)
            .map(() => new club.ClearSelected() )
}