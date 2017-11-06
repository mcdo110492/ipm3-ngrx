import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import * as masterDataActions from './../actions/master-data.actions';
import * as fromMasterData from './../reducers/master-data.reducers';

import { MasterDataService } from "./../master-data.service";

import { LoaderSpinnerService } from "./../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../main-content/services/toastr.service";

@Injectable()
export class MasterDataEffects {

    constructor(private _service : MasterDataService, private _actions$ : Actions, private _store$ : Store<fromMasterData.State>, private _loader : LoaderSpinnerService, private _toastr : ToastrService){}

    @Effect()
        loadProjects$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_PROJECTS)
        .switchMap( () => {
            return this._service.getProjects()
            .map((response) => new masterDataActions.GetAllProjectsSuccess(response.data) )
            .catch(err => Observable.of(new masterDataActions.MasterDataError(err) ))
        });

    @Effect()
        loadPositions$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_POSITIONS)
        .switchMap( () => {
            return this._service.getPositions()
            .map((response) => new masterDataActions.GetAllPositionsSuccess(response.data) )
            .catch(err => Observable.of(new masterDataActions.MasterDataError(err) ))
        });

    @Effect()
        loadEmploymentStatus$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_EMPLOYMENT_STATUS)
        .switchMap( () => {
            return this._service.getEmploymentStatus()
            .map((response) => new masterDataActions.GetAllEmploymentStatusSuccess(response.data) )
            .catch(err => Observable.of(new masterDataActions.MasterDataError(err) ))
        });

    @Effect()
        loadEmployeeStatus$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_EMPLOYEE_STATUS)
        .switchMap( () => {
            return this._service.getEmployeeStatus()
            .map((response) => new masterDataActions.GetAllEmployeeStatusSuccess(response.data) )
            .catch(err => Observable.of(new masterDataActions.MasterDataError(err) ))
        });


                       

    @Effect({ dispatch : false })
        error$ = this._actions$
                 .ofType<masterDataActions.MasterDataError>(masterDataActions.MASTER_DATA_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})
                 
}
