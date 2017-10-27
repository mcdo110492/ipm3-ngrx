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




import * as employmentStatusAction from './../actions/employment-status.actions';
import * as fromRootEmploymentStatus from './../reducers';
import { EmploymentStatus } from './../models/employment-status.model';

import { EmploymentStatusService } from "./../employment-status.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

@Injectable()
export class EmploymentStatusEffects {

    constructor(private _service : EmploymentStatusService, private _actions$ : Actions, private _store$ : Store<fromRootEmploymentStatus.State>, private _loader : LoaderSpinnerService, private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(employmentStatusAction.LOAD)
        .withLatestFrom(
            this._store$.select(fromRootEmploymentStatus.getPageIndex),
            this._store$.select(fromRootEmploymentStatus.getPageSize),
            this._store$.select(fromRootEmploymentStatus.getSortField),
            this._store$.select(fromRootEmploymentStatus.getSortDirection),
            this._store$.select(fromRootEmploymentStatus.getSearchQuery)
        )
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new employmentStatusAction.LoadSuccess(response.data,response.count) )
            .catch(err => of(new employmentStatusAction.LoadError(err) ))

        });

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(employmentStatusAction.SEARCH)
        .withLatestFrom(
            this._store$.select(fromRootEmploymentStatus.getPageIndex),
            this._store$.select(fromRootEmploymentStatus.getPageSize),
            this._store$.select(fromRootEmploymentStatus.getSortField),
            this._store$.select(fromRootEmploymentStatus.getSortDirection),
            this._store$.select(fromRootEmploymentStatus.getSearchQuery)
        )
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new employmentStatusAction.LoadSuccess(response.data,response.count) )
            .catch(err => of(new employmentStatusAction.LoadError(err) ))

        });

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<employmentStatusAction.SaveEmploymentStatus>(employmentStatusAction.SAVE_EMPLOYMENT_STATUS)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            if(payload.employmentStatusId == 0){
            
                return this._service.save(payload)
                .map((response) =>  new employmentStatusAction.SaveSuccess(response.status) )
                .catch((err) => of( new employmentStatusAction.LoadError(err) ))
                .do(() => this._loader.closeDialog())
                
            }
            else {

                return this._service.update(payload)
                .map((response) => new employmentStatusAction.SaveSuccess(response.status) )
                .catch((err) => of( new employmentStatusAction.LoadError(err) ))
                .do(() => this._loader.closeDialog())
            }

        })

    @Effect()
        saveSuccess$  = this._actions$
                       .ofType(employmentStatusAction.SAVE_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       .mergeMap(() => {
                           return [
                            new employmentStatusAction.Load(),
                            new employmentStatusAction.ClearSelectEmploymentStatus()
                           ];
                       })
                       

                       

    @Effect()
        error$ = this._actions$
                 .ofType<employmentStatusAction.LoadError>(employmentStatusAction.LOAD_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})
                 .mergeMap((payload) => {
                     return [
                        (payload.status == 422) ? new employmentStatusAction.ClearSelectEmploymentStatus() : []
                     ];
                 })
                 
}
