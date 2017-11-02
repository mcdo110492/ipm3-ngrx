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
import 'rxjs/add/operator/filter';

import * as empPersonal from './../actions/employee-personal.actions';
import * as fromRoot from './../../reducers';
import { EmployeePersonal } from './../models/employee-personal.models';

import { EmployeePersonalInformationService } from "./../employee-personal-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeePersonalInformationEffects {

    constructor(private _service : EmployeePersonalInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getPersonal$ : Observable<Action> = this._actions$
        .ofType(empPersonal.GET_PERSONAL)
        .withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        )
        .switchMap( ([action, employeeId]) => {
            return this._service.getPersonal(employeeId)
            .map((response) => new empPersonal.GetPersonalSuccess(response.data) )
            .catch(err => of(new empPersonal.GetPersonalError(err) ))

        });
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<empPersonal.GetPersonalError>(empPersonal.GET_PERSONAL_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})
                 .filter(payload => payload.status == 404)
                 .do(() => this._router.navigateByUrl('404/page-not-found'))


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<empPersonal.SavePersonal>(empPersonal.SAVE_PERSONAL)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            
            return this._service.updatePersonal(payload)
                .map((response) =>  new empPersonal.SavePersonalSuccess(payload) )
                .catch((err) => of( new empPersonal.GetPersonalError(err) ))
                .do(() => this._loader.closeDialog())

        })

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(empPersonal.SAVE_PERSONAL_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       
                                 
}
