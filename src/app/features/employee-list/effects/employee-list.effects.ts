import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged,filter } from "rxjs/operators";

import * as employeeListAction from './../actions/employee-list.actions';
import * as fromRootEmployeeList from './../reducers';
import { EmployeeList } from './../models/employee-list.models';

import { EmployeeListService } from "./../employee-list.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

import * as fromMain from './../../../main-content/reducers/main-content.reducers';

@Injectable()
export class EmploymentListEffects {

    constructor(private _service : EmployeeListService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootEmployeeList.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _mainStore : Store<fromMain.State>){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(employeeListAction.LOAD)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRootEmployeeList.getPageIndex),
                this._store$.select(fromRootEmployeeList.getPageSize),
                this._store$.select(fromRootEmployeeList.getSortField),
                this._store$.select(fromRootEmployeeList.getSortDirection),
                this._store$.select(fromRootEmployeeList.getSearchQuery),
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,project]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,project)
                .pipe(
                    map((response) => new employeeListAction.LoadSuccess(response.data,response.count) ),
                    catchError(err => of(new employeeListAction.LoadError(err) ))
                )
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(employeeListAction.SEARCH)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRootEmployeeList.getPageIndex),
                this._store$.select(fromRootEmployeeList.getPageSize),
                this._store$.select(fromRootEmployeeList.getSortField),
                this._store$.select(fromRootEmployeeList.getSortDirection),
                this._store$.select(fromRootEmployeeList.getSearchQuery),
                this._mainStore.select(fromMain.getCurrentProject)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,project]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,project)
                .pipe(
                    map((response) => new employeeListAction.LoadSuccess(response.data,response.count) ),
                    catchError(err => of(new employeeListAction.LoadError(err) ))
                )
            })
        );
                       

    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<employeeListAction.LoadError>(employeeListAction.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)})
                 );
                 
                 
}
