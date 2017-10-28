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
import 'rxjs/add/operator/filter';

import * as employeeStatusAction from './../actions/employee-status.actions';
import * as fromRootEmployeeStatus from './../reducers';
import { EmployeeStatus } from './../models/employee-status.model';

import { EmployeeStatusService } from "./../employee-status.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

@Injectable()
export class EmploymentStatusEffects {

    constructor(private _service : EmployeeStatusService, private _actions$ : Actions, private _store$ : Store<fromRootEmployeeStatus.State>, private _loader : LoaderSpinnerService, private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(employeeStatusAction.LOAD)
        .withLatestFrom(
            this._store$.select(fromRootEmployeeStatus.getPageIndex),
            this._store$.select(fromRootEmployeeStatus.getPageSize),
            this._store$.select(fromRootEmployeeStatus.getSortField),
            this._store$.select(fromRootEmployeeStatus.getSortDirection),
            this._store$.select(fromRootEmployeeStatus.getSearchQuery)
        )
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new employeeStatusAction.LoadSuccess(response.data,response.count) )
            .catch(err => of(new employeeStatusAction.LoadError(err) ))

        });

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(employeeStatusAction.SEARCH)
        .withLatestFrom(
            this._store$.select(fromRootEmployeeStatus.getPageIndex),
            this._store$.select(fromRootEmployeeStatus.getPageSize),
            this._store$.select(fromRootEmployeeStatus.getSortField),
            this._store$.select(fromRootEmployeeStatus.getSortDirection),
            this._store$.select(fromRootEmployeeStatus.getSearchQuery)
        )
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new employeeStatusAction.LoadSuccess(response.data,response.count) )
            .catch(err => of(new employeeStatusAction.LoadError(err) ))

        });

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<employeeStatusAction.SaveEmployeeStatus>(employeeStatusAction.SAVE_EMPLOYEE_STATUS)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            if(payload.employeeStatusId == 0){
            
                return this._service.save(payload)
                .map((response) =>  new employeeStatusAction.SaveSuccess(response.status) )
                .catch((err) => of( new employeeStatusAction.LoadError(err) ))
                .do(() => this._loader.closeDialog())
                
            }
            else {

                return this._service.update(payload)
                .map((response) => new employeeStatusAction.SaveSuccess(response.status) )
                .catch((err) => of( new employeeStatusAction.LoadError(err) ))
                .do(() => this._loader.closeDialog())
            }

        })

    @Effect()
        saveSuccess$  = this._actions$
                       .ofType(employeeStatusAction.SAVE_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       .mergeMap(() => {
                           return [
                            new employeeStatusAction.Load(),
                            new employeeStatusAction.ClearSelectEmployeeStatus()
                           ];
                       })
                       

                       

    @Effect()
        error$ = this._actions$
                 .ofType<employeeStatusAction.LoadError>(employeeStatusAction.LOAD_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})
                 .filter( payload => payload.status == 422)
                 .map(() => new employeeStatusAction.ClearSelectEmployeeStatus() )
                 
}
