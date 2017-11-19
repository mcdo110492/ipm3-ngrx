import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged, filter } from "rxjs/operators";

import * as collectionSchedulesActions from './../actions/collection-schedules.actions';
import * as fromRootCollectionSchedules from './../reducers';
import { CollectionSchedules } from './../models/collection-schedules.model';

import { CollectionSchedulesService } from "./../collection-schedules.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";


@Injectable()
export class CollectionSchedulesEffects {

    constructor(private _service : CollectionSchedulesService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootCollectionSchedules.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(collectionSchedulesActions.LOAD)
        .pipe(
            tap(() => new collectionSchedulesActions.IsLoading(true) ),
            withLatestFrom(
                this._store$.select(fromRootCollectionSchedules.getCollectionPageIndex),
                this._store$.select(fromRootCollectionSchedules.getCollectionPageSize),
                this._store$.select(fromRootCollectionSchedules.getCollectionSortField),
                this._store$.select(fromRootCollectionSchedules.getCollectionSortDirection),
                this._store$.select(fromRootCollectionSchedules.getCollectionSearchQuery),
                this._store$.select(fromRootCollectionSchedules.getCollectionIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,isLoaded]) => {

                if(isLoaded){
                    return of(new collectionSchedulesActions.IsLoading(false));
                }

                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        map((response) => new collectionSchedulesActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new collectionSchedulesActions.LoadError(err) ))
                    )    
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(collectionSchedulesActions.SEARCH)
        .pipe(
            tap(() => new collectionSchedulesActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootCollectionSchedules.getCollectionPageIndex),
                this._store$.select(fromRootCollectionSchedules.getCollectionPageSize),
                this._store$.select(fromRootCollectionSchedules.getCollectionSortField),
                this._store$.select(fromRootCollectionSchedules.getCollectionSortDirection),
                this._store$.select(fromRootCollectionSchedules.getCollectionSearchQuery)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        tap(() => new collectionSchedulesActions.IsLoading(false)),
                        map((response) => new collectionSchedulesActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new collectionSchedulesActions.LoadError(err) ))
                    )
    
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<collectionSchedulesActions.SaveCollectionSchedules>(collectionSchedulesActions.SAVE_COLLECTIONSCHEDULES)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                if(payload.collectionScheduleId == 0){
                
                    return this._service.save(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new collectionSchedulesActions.CreateCollectionSchedules(),
                                    new collectionSchedulesActions.SaveSuccess(response.status),
                                    new collectionSchedulesActions.Load()       
                                ];
                            }),
                            catchError((err) => of( new collectionSchedulesActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new collectionSchedulesActions.SaveSuccess(response.status),
                                    new collectionSchedulesActions.UpdateSuccess({ id: payload.collectionScheduleId, updatedData: payload  })
                                ];
                            }),
                            catchError((err) => of( new collectionSchedulesActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );
        
    @Effect()
        saveSuccess$ : Observable<Action>  = this._actions$
                       .ofType(collectionSchedulesActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new collectionSchedulesActions.ClearSelectCollectionSchedules())
                           
                       );
                       

                       

    @Effect()
        error$ : Observable<Action> = this._actions$
                 .ofType<collectionSchedulesActions.LoadError>(collectionSchedulesActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new collectionSchedulesActions.ClearSelectCollectionSchedules() )
                 );
                 
            
}
