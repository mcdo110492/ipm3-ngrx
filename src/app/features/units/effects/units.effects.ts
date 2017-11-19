import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged, filter } from "rxjs/operators";

import * as unitsActions from './../actions/units.actions';
import * as fromRootUnits from './../reducers';
import { Units } from './../models/units.model';

import { UnitsService } from "./../units.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";


@Injectable()
export class UnitsEffects {

    constructor(private _service : UnitsService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootUnits.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(unitsActions.LOAD)
        .pipe(
            tap(() => new unitsActions.IsLoading(true) ),
            withLatestFrom(
                this._store$.select(fromRootUnits.getCollectionPageIndex),
                this._store$.select(fromRootUnits.getCollectionPageSize),
                this._store$.select(fromRootUnits.getCollectionSortField),
                this._store$.select(fromRootUnits.getCollectionSortDirection),
                this._store$.select(fromRootUnits.getCollectionSearchQuery),
                this._store$.select(fromRootUnits.getCollectionIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,isLoaded]) => {

                if(isLoaded){
                    return of(new unitsActions.IsLoading(false));
                }

                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        map((response) => new unitsActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new unitsActions.LoadError(err) ))
                    )    
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(unitsActions.SEARCH)
        .pipe(
            tap(() => new unitsActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootUnits.getCollectionPageIndex),
                this._store$.select(fromRootUnits.getCollectionPageSize),
                this._store$.select(fromRootUnits.getCollectionSortField),
                this._store$.select(fromRootUnits.getCollectionSortDirection),
                this._store$.select(fromRootUnits.getCollectionSearchQuery)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        tap(() => new unitsActions.IsLoading(false)),
                        map((response) => new unitsActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new unitsActions.LoadError(err) ))
                    )
    
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<unitsActions.SaveUnits>(unitsActions.SAVE_UNITS)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                if(payload.unitId == 0){
                
                    return this._service.save(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new unitsActions.CreateUnits(),
                                    new unitsActions.SaveSuccess(response.status),
                                    new unitsActions.Load()       
                                ];
                            }),
                            catchError((err) => of( new unitsActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new unitsActions.SaveSuccess(response.status),
                                    new unitsActions.UpdateSuccess({ id: payload.unitId, updatedData: payload  })
                                ];
                            }),
                            catchError((err) => of( new unitsActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );
        
    @Effect()
        saveSuccess$ : Observable<Action>  = this._actions$
                       .ofType(unitsActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new unitsActions.ClearSelectUnits())
                           
                       );
                       

                       

    @Effect()
        error$ : Observable<Action> = this._actions$
                 .ofType<unitsActions.LoadError>(unitsActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new unitsActions.ClearSelectUnits() )
                 );
                 
            
}
