import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

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
        .withLatestFrom(
            this._store$.select(fromRootEmployeeList.getPageIndex),
            this._store$.select(fromRootEmployeeList.getPageSize),
            this._store$.select(fromRootEmployeeList.getSortField),
            this._store$.select(fromRootEmployeeList.getSortDirection),
            this._store$.select(fromRootEmployeeList.getSearchQuery),
            this._mainStore.select(fromMain.getCurrentProject)
        )
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,project]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,project)
            .map((response) => new employeeListAction.LoadSuccess(response.data,response.count) )
            .catch(err => Observable.of(new employeeListAction.LoadError(err) ))

        });

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(employeeListAction.SEARCH)
        .withLatestFrom(
            this._store$.select(fromRootEmployeeList.getPageIndex),
            this._store$.select(fromRootEmployeeList.getPageSize),
            this._store$.select(fromRootEmployeeList.getSortField),
            this._store$.select(fromRootEmployeeList.getSortDirection),
            this._store$.select(fromRootEmployeeList.getSearchQuery),
            this._mainStore.select(fromMain.getCurrentProject)
        )
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,project]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery,project)
            .map((response) => new employeeListAction.LoadSuccess(response.data,response.count) )
            .catch(err => Observable.of(new employeeListAction.LoadError(err) ))

        });
                       

                       

    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<employeeListAction.LoadError>(employeeListAction.LOAD_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})
                 
}
