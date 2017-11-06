import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';

import * as government from './../actions/employee-government.actions';
import * as fromRoot from './../../reducers';
import { EmployeeGovernment } from './../models/employee-government.model';

import { EmployeeGovernmentInformationService } from "./../employee-government-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeGovernmentInformationEffects {

    constructor(private _service : EmployeeGovernmentInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getGovernment$ : Observable<Action> = this._actions$
        .ofType(government.GET_GOVERNMENT)
        .withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        )
        .switchMap( ([action, employeeId]) => {
            return this._service.getGovernment(employeeId)
            .map((response) => new government.GetGovernmentSuccess(response.data) )
            .catch(err => Observable.of(new government.GetGovernmentError(err) ))

        });
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<government.GetGovernmentError>(government.GET_GOVERNMENT_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<government.SaveGovernment>(government.SAVE_GOVERNMENT)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            
            return this._service.updateGovernment(payload)
                .map((response) =>  new government.SaveGovernmentSuccess(payload) )
                .catch((err) => Observable.of( new government.GetGovernmentError(err) ))
                .do(() => this._loader.closeDialog())

        })

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(government.SAVE_GOVERNMENT_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       
                                 
}
