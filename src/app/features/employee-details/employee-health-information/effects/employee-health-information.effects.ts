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

import * as health from './../actions/employee-health.actions';
import * as fromRoot from './../../reducers';
import { EmployeeHealth } from './../models/employee-health.model';

import { EmployeeHealthInformationService } from "./../employee-health-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeHealthInformationEffects {

    constructor(private _service : EmployeeHealthInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getHealth$ : Observable<Action> = this._actions$
        .ofType(health.GET_HEALTH)
        .withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        )
        .switchMap( ([action, employeeId]) => {
            return this._service.getHealth(employeeId)
            .map((response) => new health.GetHealthSuccess(response.data) )
            .catch(err => of(new health.GetHealthError(err) ))

        });
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<health.GetHealthError>(health.GET_HEALTH_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<health.SaveHealth>(health.SAVE_HEALTH)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            
            return this._service.updateHealth(payload)
                .map((response) =>  new health.SaveHealthSuccess(payload) )
                .catch((err) => of( new health.GetHealthError(err) ))
                .do(() => this._loader.closeDialog())

        })

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(health.SAVE_HEALTH_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       
                                 
}
