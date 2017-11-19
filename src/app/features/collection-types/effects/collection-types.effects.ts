import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged, filter } from "rxjs/operators";

import * as collectionTypesActions from './../actions/collection-types.actions';
import * as fromRootCollectionTypes from './../reducers';
import { CollectionTypes } from './../models/collection-types.model';

import { CollectionTypesService } from "./../collection-types.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";


@Injectable()
export class CollectionTypesEffects {

    constructor(private _service : CollectionTypesService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootCollectionTypes.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(collectionTypesActions.LOAD)
        .pipe(
            tap(() => new collectionTypesActions.IsLoading(true) ),
            withLatestFrom(
                this._store$.select(fromRootCollectionTypes.getCollectionPageIndex),
                this._store$.select(fromRootCollectionTypes.getCollectionPageSize),
                this._store$.select(fromRootCollectionTypes.getCollectionSortField),
                this._store$.select(fromRootCollectionTypes.getCollectionSortDirection),
                this._store$.select(fromRootCollectionTypes.getCollectionSearchQuery),
                this._store$.select(fromRootCollectionTypes.getCollectionIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,isLoaded]) => {

                if(isLoaded){
                    return of(new collectionTypesActions.IsLoading(false));
                }

                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        map((response) => new collectionTypesActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new collectionTypesActions.LoadError(err) ))
                    )    
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(collectionTypesActions.SEARCH)
        .pipe(
            tap(() => new collectionTypesActions.IsLoading(true)),
            withLatestFrom(
                this._store$.select(fromRootCollectionTypes.getCollectionPageIndex),
                this._store$.select(fromRootCollectionTypes.getCollectionPageSize),
                this._store$.select(fromRootCollectionTypes.getCollectionSortField),
                this._store$.select(fromRootCollectionTypes.getCollectionSortDirection),
                this._store$.select(fromRootCollectionTypes.getCollectionSearchQuery)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        tap(() => new collectionTypesActions.IsLoading(false)),
                        map((response) => new collectionTypesActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new collectionTypesActions.LoadError(err) ))
                    )
    
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<collectionTypesActions.SaveCollectionTypes>(collectionTypesActions.SAVE_COLLECTIONTYPES)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                if(payload.collectionTypeId == 0){
                
                    return this._service.save(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new collectionTypesActions.CreateCollectionTypes(),
                                    new collectionTypesActions.SaveSuccess(response.status),
                                    new collectionTypesActions.Load()       
                                ];
                            }),
                            catchError((err) => of( new collectionTypesActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new collectionTypesActions.SaveSuccess(response.status),
                                    new collectionTypesActions.UpdateSuccess({ id: payload.collectionTypeId, updatedData: payload  })
                                ];
                            }),
                            catchError((err) => of( new collectionTypesActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );
        
    @Effect()
        saveSuccess$ : Observable<Action>  = this._actions$
                       .ofType(collectionTypesActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new collectionTypesActions.ClearSelectCollectionTypes())
                           
                       );
                       

                       

    @Effect()
        error$ : Observable<Action> = this._actions$
                 .ofType<collectionTypesActions.LoadError>(collectionTypesActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new collectionTypesActions.ClearSelectCollectionTypes() )
                 );
                 
            
}
