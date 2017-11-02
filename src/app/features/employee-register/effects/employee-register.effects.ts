import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import * as empActions from './../actions/employee-register.actions';
import * as fromEmp from './../reducers';

import * as fromMain from './../../../main-content/reducers/main-content.reducers';

import { EmployeeRegisterService } from "./../employee-register.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeRegisterEffects {

    constructor(
        private _service: EmployeeRegisterService,
        private _actions$: Actions,
        private _toastr : ToastrService,
        private _loader : LoaderSpinnerService,
        private _router : Router,
        private _store : Store<fromEmp.State>,
        private _mainStore : Store<fromMain.State>
    ) {}

    @Effect()
        submit$ : Observable<Action> = this._actions$
        .ofType<empActions.Submit>(empActions.SUBMIT)
        .withLatestFrom(
            this._store.select(fromEmp.getEmployeeRegister),
            this._mainStore.select(fromMain.getCurrentProject)
        )
        .switchMap( ([action,formData,project]) => {
            this._loader.openDialog();
            return this._service.submitForm(formData,project)
                    .map(() => new empActions.SubmitSuccess() )
                    .catch((err) => of( new empActions.SubmitError(err) ))
                    .do(() => this._loader.closeDialog())
        });

    @Effect()
        submitSuccess$ : Observable<Action> = this._actions$
        .ofType<empActions.SubmitSuccess>(empActions.SUBMIT_SUCCESS)
        .do(() => { this._toastr.saveSuccess(); this._router.navigateByUrl('/employee/list'); })
        .map(() => new empActions.Save(null) );

    @Effect({dispatch : false})
        submitError$ : Observable<Action> = this._actions$
        .ofType<empActions.SubmitError>(empActions.SUBMIT_ERROR)
        .map((action) => action.payload)
        .do((payload) => this._toastr.errorHandler(payload))

    
}
