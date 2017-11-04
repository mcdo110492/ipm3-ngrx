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

import * as contact from './../actions/employee-contact.actions';
import * as fromRoot from './../../reducers';
import { EmployeeContact } from './../models/employee-contact.model';

import { EmployeeContactInformationService } from "./../employee-contact-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeContactInformationEffects {

    constructor(private _service : EmployeeContactInformationService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRoot.State>, 
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService,
                private _router : Router){}

    @Effect()
        getContact$ : Observable<Action> = this._actions$
        .ofType(contact.GET_CONTACT)
        .withLatestFrom(
            this._store$.select(fromRoot.getEmployeeId),
        )
        .switchMap( ([action, employeeId]) => {
            return this._service.getContact(employeeId)
            .map((response) => new contact.GetContactSuccess(response.data) )
            .catch(err => of(new contact.GetContactError(err) ))

        });
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<contact.GetContactError>(contact.GET_CONTACT_ERROR)
                 .map((action) => action.payload)
                 .do((payload) => { this._toastr.errorHandler(payload)})


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<contact.SaveContact>(contact.SAVE_CONTACT)
        .map( (action) => action.payload)
        .switchMap((payload) => {

            this._loader.openDialog();
            
            return this._service.updateContact(payload)
                .map((response) =>  new contact.SaveContactSuccess(payload) )
                .catch((err) => of( new contact.GetContactError(err) ))
                .do(() => this._loader.closeDialog())

        })

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(contact.SAVE_CONTACT_SUCCESS)
                       .do(() => { this._toastr.saveSuccess(); })
                       
                                 
}
