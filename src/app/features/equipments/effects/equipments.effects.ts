import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged, filter } from "rxjs/operators";

import * as equipmentsActions from './../actions/equipments.actions';
import * as fromRootEquipments from './../reducers';
import { Equipment } from './../models/equipments.model';

import { EquipmentsService } from "./../equipments.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

import * as fromMain from './../../../main-content/reducers/main-content.reducers';

@Injectable()
export class EquipmentsEffects {

    constructor(private _service : EquipmentsService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootEquipments.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _mainStore : Store<fromMain.State>){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(equipmentsActions.LOAD)
        .pipe(
            tap(() => new equipmentsActions.IsLoading(true) ),
            withLatestFrom(
                this._store$.select(fromRootEquipments.getCollectionPageIndex),
                this._store$.select(fromRootEquipments.getCollectionPageSize),
                this._store$.select(fromRootEquipments.getCollectionSortField),
                this._store$.select(fromRootEquipments.getCollectionSortDirection),
                this._store$.select(fromRootEquipments.getCollectionSearchQuery),
                this._mainStore.select(fromMain.getCurrentProject),
                this._store$.select(fromRootEquipments.getCollectionIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,projectId,isLoaded]) => {

                if(isLoaded){
                    return of(new equipmentsActions.IsLoading(false));
                }

                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,projectId)
                    .pipe(
                        map((response) => new equipmentsActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new equipmentsActions.LoadError(err) ))
                    )    
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(equipmentsActions.SEARCH)
        .pipe(
            tap(() => new equipmentsActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootEquipments.getCollectionPageIndex),
                this._store$.select(fromRootEquipments.getCollectionPageSize),
                this._store$.select(fromRootEquipments.getCollectionSortField),
                this._store$.select(fromRootEquipments.getCollectionSortDirection),
                this._store$.select(fromRootEquipments.getCollectionSearchQuery),
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,projectId]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,projectId)
                    .pipe(
                        tap(() => new equipmentsActions.IsLoading(false)),
                        map((response) => new equipmentsActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new equipmentsActions.LoadError(err) ))
                    )
    
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<equipmentsActions.SaveEquipments>(equipmentsActions.SAVE_EQUIPMENTS)
        .pipe(
            withLatestFrom(
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            switchMap(([action,projectId]) => {
    
                this._loader.openDialog();
                if(action.payload.equipmentId == 0){
                
                    return this._service.save(action.payload,projectId)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new equipmentsActions.CreateEquipments(),
                                    new equipmentsActions.SaveSuccess(response.status),
                                    new equipmentsActions.Load()       
                                ];
                            }),
                            catchError((err) => of( new equipmentsActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(action.payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new equipmentsActions.SaveSuccess(response.status),
                                    new equipmentsActions.UpdateSuccess({ id: action.payload.equipmentId, updatedData: response.updatedData  })
                                ];
                            }),
                            catchError((err) => of( new equipmentsActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );

    @Effect() 
        changeStatus$ : Observable<Action> = this._actions$
                        .ofType<equipmentsActions.ChangeStatus>(equipmentsActions.CHANGE_STATUS)
                        .pipe(
                            switchMap((action) => {
                                this._loader.openDialog();
                                return this._service.changeStatus(action.payload.id,action.payload.status)
                                .pipe(
                                    mergeMap((response) => {
                                        return [
                                            new equipmentsActions.SaveSuccess(response.status),
                                            new equipmentsActions.UpdateSuccess({ id: action.payload.id, updatedData: response.updatedData  })
                                        ];
                                    }),
                                    catchError((err) => of( new equipmentsActions.LoadError(err) )),
                                    tap(() => this._loader.closeDialog())
                                )
                            })
                        );
        
    @Effect()
        saveSuccess$ : Observable<Action>  = this._actions$
                       .ofType(equipmentsActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new equipmentsActions.ClearSelectEquipments())
                           
                       );

                       

    @Effect()
        error$ : Observable<Action> = this._actions$
                 .ofType<equipmentsActions.LoadError>(equipmentsActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new equipmentsActions.ClearSelectEquipments() )
                 );
                 
            
}
