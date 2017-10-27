import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';




import * as positionActions from './../actions/position.actions';
import * as fromRootPosition from './../reducers';
import { Position } from './../models/positions.model';

import { PositionsService } from "./../positions.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

@Injectable()
export class PositionTableEffects {

    constructor(private _service : PositionsService, private _actions$ : Actions, private _store$ : Store<fromRootPosition.State>, private _loader : LoaderSpinnerService, private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(positionActions.LOAD)
        .withLatestFrom(
            this._store$.select(fromRootPosition.getPageIndex),
            this._store$.select(fromRootPosition.getPageSize),
            this._store$.select(fromRootPosition.getSortField),
            this._store$.select(fromRootPosition.getSortDirection),
            this._store$.select(fromRootPosition.getSearchQuery)
        )
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new positionActions.LoadSuccess(response.data,response.count) )
            .catch(err => of(new positionActions.LoadError(err) ))

        });

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(positionActions.SEARCH)
        .withLatestFrom(
            this._store$.select(fromRootPosition.getPageIndex),
            this._store$.select(fromRootPosition.getPageSize),
            this._store$.select(fromRootPosition.getSortField),
            this._store$.select(fromRootPosition.getSortDirection),
            this._store$.select(fromRootPosition.getSearchQuery)
        )
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new positionActions.LoadSuccess(response.data,response.count) )
            .catch(err => of(new positionActions.LoadError(err) ))

        });

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<positionActions.SavePosition>(positionActions.SAVE_POSITION)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            if(payload.positionId == 0){
            
                return this._service.save(payload)
                .map((response) =>  new positionActions.SaveSuccess(response.status) )
                .catch((err) => of( new positionActions.LoadError(err) ))
                .do(() => this._loader.closeDialog())
                
            }
            else {

                return this._service.update(payload)
                .map((response) => new positionActions.SaveSuccess(response.status) )
                .catch((err) => of( new positionActions.LoadError(err) ))
                .do(() => this._loader.closeDialog())
            }

        })

    @Effect()
        saveSuccess$  = this._actions$
                       .ofType(positionActions.SAVE_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       .mergeMap(() => {
                           return [
                            new positionActions.Load(),
                            new positionActions.ClearSelectPosition()
                           ];
                       })
                       

                       

    @Effect()
        error$ = this._actions$
                 .ofType<positionActions.LoadError>(positionActions.LOAD_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})
                 .mergeMap((payload) => {
                     return [
                        (payload.status == 422) ? new positionActions.ClearSelectPosition() : []
                     ];
                 })
                 
}
