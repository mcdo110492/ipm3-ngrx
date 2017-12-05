import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap, tap, withLatestFrom } from "rxjs/operators";

import * as masterDataActions from './../actions/master-data.actions';
import * as fromMasterData from './../reducers/master-data.reducers';

import { MasterDataService } from "./../master-data.service";

import { LoaderSpinnerService } from "./../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../main-content/services/toastr.service";

import * as fromMain from './../../main-content/reducers/main-content.reducers';

@Injectable()
export class MasterDataEffects {

    constructor(private _service : MasterDataService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromMasterData.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _mainStore : Store<fromMain.State>){}

    @Effect()
        loadProjects$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_PROJECTS)
        .pipe(
            switchMap( () => {
                return this._service.getAllProjects()
                .pipe(
                    map(response => new masterDataActions.GetAllProjectsSuccess(response.data) ),
                    catchError(err => of(new masterDataActions.MasterDataError(err) ))
                )              
            })
        );
        

    @Effect()
        loadPositions$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_POSITIONS)
        .pipe(
            switchMap( () => {
                return this._service.getAllPositions()
                .pipe(
                    map((response) => new masterDataActions.GetAllPositionsSuccess(response.data) ),
                    catchError(err => of(new masterDataActions.MasterDataError(err) ))
                )
            })
        );

    @Effect()
        loadEmploymentStatus$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_EMPLOYMENT_STATUS)
        .pipe(
            switchMap( () => {
                return this._service.getAllEmploymentStatus()
                .pipe(
                    map((response) => new masterDataActions.GetAllEmploymentStatusSuccess(response.data) ),
                    catchError(err => of(new masterDataActions.MasterDataError(err) ))
                )
            })
        );
        

    @Effect()
        loadEmployeeStatus$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_EMPLOYEE_STATUS)
        .pipe(
            switchMap( () => {
                return this._service.getAllEmployeeStatus()
                .pipe(
                    map((response) => new masterDataActions.GetAllEmployeeStatusSuccess(response.data) ),
                    catchError(err => of(new masterDataActions.MasterDataError(err) ))
                )
            })
        );
    
    @Effect()
        loadUnits$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_UNITS)
        .pipe(
            switchMap(() => {
                return this._service.getAllUnits()
                .pipe(
                    map((response) => new masterDataActions.GetAllUnitsSuccess(response.data)),
                    catchError(err => of(new masterDataActions.MasterDataError(err)))
                )
            })
        );

    @Effect()
        loadEquipments$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_EQUIPMENTS)
        .pipe(
            withLatestFrom(
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            switchMap(([action,projectId]) => {
                return this._service.getAllEquipments(projectId)
                .pipe(
                    map((response) => new masterDataActions.GetAllEquipmentsSuccess(response.data)),
                    catchError(err => of(new masterDataActions.MasterDataError(err)))
                )
            })
        );

    @Effect()
        loadCollectionSchedules$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_COLLECTION_SCHEDULE)
        .pipe(
            switchMap(() => {
                return this._service.getAllCollectionSchedules()
                .pipe(
                    map((response) => new masterDataActions.GetAllCollectionScheduleSuccess(response.data)),
                    catchError(err => of(new masterDataActions.MasterDataError(err)))
                )
            })
        );

    @Effect()
        loadCollectionType$ : Observable<Action> = this._actions$
        .ofType(masterDataActions.GET_ALL_COLLECTION_TYPE)
        .pipe(
            switchMap(() => {
                return this._service.getAllCollectionTypes()
                .pipe(
                    map((response) => new masterDataActions.GetAllCollectionTypeSuccess(response.data)),
                    catchError(err => of(new masterDataActions.MasterDataError(err)))
                )
            })
        );

                       

    @Effect({ dispatch : false })
        error$ = this._actions$
                 .ofType<masterDataActions.MasterDataError>(masterDataActions.MASTER_DATA_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)})
                 );
                 
}
