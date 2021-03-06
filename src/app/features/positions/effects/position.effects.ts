import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged } from "rxjs/operators";

import * as positionActions from './../actions/position.actions';
import * as fromRootPosition from './../reducers';
import { Position } from './../models/positions.model';

import { PositionsService } from "./../positions.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

@Injectable()
export class PositionTableEffects {

    constructor(private _service : PositionsService, private _actions$ : Actions, private _store$ : Store<fromRootPosition.State>, private _loader : LoaderSpinnerService, private _toastr : ToastrService){}

    /**
     * Effect that will listen to LOAD Action
     * Passed the success http request to the LOAD_SUCCESS Action and update the collection state
     * Passed the error http request to the LAOD_ERROR Action and notify the using the errorHandler method of ToastrService
     */
    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(positionActions.LOAD)
        .pipe(
            tap(() => new positionActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootPosition.getPageIndex),
                this._store$.select(fromRootPosition.getPageSize),
                this._store$.select(fromRootPosition.getSortField),
                this._store$.select(fromRootPosition.getSortDirection),
                this._store$.select(fromRootPosition.getSearchQuery),
                this._store$.select(fromRootPosition.getIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery, IsLoaded]) => {

                if(IsLoaded){
                    return of(new positionActions.IsLoading(false));
                }

                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                .pipe(
                    tap(() => new positionActions.IsLoading(false)),
                    map((response) => new positionActions.LoadSuccess(response.data,response.count) ),
                    catchError(err => of(new positionActions.LoadError(err) ))
                )
            })
        );

    /**
     * Effect that will listen to SEARCH Action
     * Passed the success http request to the LOAD_SUCCESS Action and update the collection state
     * Passed the error http request to the LAOD_ERROR Action and notify the using the errorHandler method of ToastrService
     */ 
    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(positionActions.SEARCH)
        .pipe(
            tap(() => new positionActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootPosition.getPageIndex),
                this._store$.select(fromRootPosition.getPageSize),
                this._store$.select(fromRootPosition.getSortField),
                this._store$.select(fromRootPosition.getSortDirection),
                this._store$.select(fromRootPosition.getSearchQuery)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        tap(() => new positionActions.IsLoading(false)),
                        map((response) => new positionActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new positionActions.LoadError(err) ))
                    )
            })
        );
    /**
     * Effect  tah will listen to SAVE Action
     */
    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<positionActions.SavePosition>(positionActions.SAVE_POSITION)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog(); // opening of a loader dialog
                // Check  the id of the data if data is equal to 0 it will create a new data otherwise it will update the data
                if(payload.positionId == 0){
                
                    return this._service.save(payload)
                    .pipe(
                        mergeMap((response) => {
                            return [
                                new positionActions.CreatePosition(),
                                new positionActions.SaveSuccess(response.status),
                                new positionActions.Load()
                            ];
                        }),
                        catchError((err) => of( new positionActions.LoadError(err) )),
                        tap(() => this._loader.closeDialog())
                    )
                }
                else {
    
                    return this._service.update(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [   
                                    new positionActions.SaveSuccess(response.status),
                                    new positionActions.UpdateSuccess({ id: payload.positionId, updatedData : payload })
                                ];
                            }),
                            catchError((err) => of( new positionActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })
        );
        
    
    /**
     * Effect that will listen to SAVE_SUCCESS Action
     * It will dispatch the LOAD Action and also the ClearSelectPosition Action to reset the form and update the selected state
     */
    @Effect()
        saveSuccess$  = this._actions$
                       .ofType(positionActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new positionActions.ClearSelectPosition())
                       );
                       
    /**
     * Effect that will listen to LOAD_ERROR Action
     */
    @Effect({ dispatch: false })
        error$ = this._actions$
                 .ofType<positionActions.LoadError>(positionActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)})
                 );
                 
                 
}
