import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, withLatestFrom, tap } from "rxjs/operators";

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
        .pipe(
            withLatestFrom(
                this._store$.select(fromRoot.getEmployeeId)
            ),
            switchMap( ([action, employeeId]) => {
                return this._service.getContact(employeeId)
                .pipe(
                    map((response) => new contact.GetContactSuccess(response.data) ),
                    catchError(err => of(new contact.GetContactError(err) ))
                )
            })
        );
       
    @Effect({dispatch : false})
        error$ = this._actions$
                 .ofType<contact.GetContactError>(contact.GET_CONTACT_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)})
                 );
                    


    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<contact.SaveContact>(contact.SAVE_CONTACT)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                
                return this._service.updateContact(payload)
                .pipe(
                    map((response) =>  new contact.SaveContactSuccess(payload) ),
                    catchError((err) => of( new contact.GetContactError(err) )),
                    tap(() => this._loader.closeDialog())
                )
            })
        );
        

    @Effect({dispatch : false})
        saveSuccess$  = this._actions$
                       .ofType(contact.SAVE_CONTACT_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); })
                       );
               
                                 
}
