import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged, filter } from "rxjs/operators";

import * as shiftsActions from './../actions/shifts.actions';
import * as fromRootShifts from './../reducers';
import { Shifts } from './../models/shifts.model';

import { ShiftsService } from "./../shifts.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

import * as fromMain from './../../../main-content/reducers/main-content.reducers';

@Injectable()
export class ShiftsEffects {

    constructor(private _service : ShiftsService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootShifts.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _mainStore : Store<fromMain.State>){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(shiftsActions.LOAD)
        .pipe(
            tap(() => new shiftsActions.IsLoading(true) ),
            withLatestFrom(
                this._store$.select(fromRootShifts.getCollectionPageIndex),
                this._store$.select(fromRootShifts.getCollectionPageSize),
                this._store$.select(fromRootShifts.getCollectionSortField),
                this._store$.select(fromRootShifts.getCollectionSortDirection),
                this._store$.select(fromRootShifts.getCollectionSearchQuery),
                this._mainStore.select(fromMain.getCurrentProject),
                this._store$.select(fromRootShifts.getCollectionIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,projectId,isLoaded]) => {

                if(isLoaded){
                    return of(new shiftsActions.IsLoading(false));
                }

                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,projectId)
                    .pipe(
                        map((response) => new shiftsActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new shiftsActions.LoadError(err) ))
                    )    
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(shiftsActions.SEARCH)
        .pipe(
            tap(() => new shiftsActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootShifts.getCollectionPageIndex),
                this._store$.select(fromRootShifts.getCollectionPageSize),
                this._store$.select(fromRootShifts.getCollectionSortField),
                this._store$.select(fromRootShifts.getCollectionSortDirection),
                this._store$.select(fromRootShifts.getCollectionSearchQuery),
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,projectId]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,projectId)
                    .pipe(
                        tap(() => new shiftsActions.IsLoading(false)),
                        map((response) => new shiftsActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new shiftsActions.LoadError(err) ))
                    )
    
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<shiftsActions.SaveShifts>(shiftsActions.SAVE_SHIFTS)
        .pipe(
            withLatestFrom(
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            switchMap(([action,projectId]) => {
    
                this._loader.openDialog();
                if(action.payload.shiftId == 0){
                
                    return this._service.save(action.payload,projectId)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new shiftsActions.CreateShifts(),
                                    new shiftsActions.SaveSuccess(response.status),
                                    new shiftsActions.Load()       
                                ];
                            }),
                            catchError((err) => of( new shiftsActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(action.payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new shiftsActions.SaveSuccess(response.status),
                                    new shiftsActions.UpdateSuccess({ id: action.payload.shiftId, updatedData: response.updatedData  })
                                ];
                            }),
                            catchError((err) => of( new shiftsActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );


        
    @Effect()
        saveSuccess$ : Observable<Action>  = this._actions$
                       .ofType(shiftsActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new shiftsActions.ClearSelectShifts())
                           
                       );

                       

    @Effect()
        error$ : Observable<Action> = this._actions$
                 .ofType<shiftsActions.LoadError>(shiftsActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new shiftsActions.ClearSelectShifts() )
                 );
                 
            
}
