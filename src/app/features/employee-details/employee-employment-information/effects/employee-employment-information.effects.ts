import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

import * as empEmployment from './../actions/employee-employment.actions';
import * as fromRoot from './../../reducers';
import { EmployeeEmployment } from './../models/employee-employment.model';

import { EmployeeEmploymentInformationService } from "./../employee-employment-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeEmploymentInformationEffects {

    constructor(private _service : EmployeeEmploymentInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getEmployment$ : Observable<Action> = this._actions$
        .ofType(empEmployment.GET_EMPLOYMENT)
        .withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        )
        .switchMap( ([action, employeeId]) => {
            return this._service.getEmployment(employeeId)
            .map((response) => new empEmployment.GetEmploymentSuccess(response.data) )
            .catch(err => of(new empEmployment.GetEmploymentError(err) ))

        });
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<empEmployment.GetEmploymentError>(empEmployment.GET_EMPLOYMENT_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<empEmployment.SaveEmployment>(empEmployment.SAVE_EMPLOYMENT)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            
            return this._service.updateEmployment(payload)
                .map((response) =>  new empEmployment.SaveEmploymentSuccess(payload) )
                .catch((err) => of( new empEmployment.GetEmploymentError(err) ))
                .do(() => this._loader.closeDialog())

        })

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(empEmployment.SAVE_EMPLOYMENT_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       
                                 
}
