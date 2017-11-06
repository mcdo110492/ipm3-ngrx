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
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import * as training from './../actions/employee-training.actions';
import * as fromRoot from './../../reducers';
import { EmployeeTraining } from './../models/employee-training.model';

import { EmployeeTrainingInformationService } from "./../employee-training-information.service";

import { LoaderSpinnerService } from "./../../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../../main-content/services/toastr.service";

@Injectable()
export class EmployeeTrainingInformationEffects {
    
    constructor(private _service : EmployeeTrainingInformationService, 
        private _actions$ : Actions, 
        private _store$ : Store<fromRoot.State>, 
        private _loader : LoaderSpinnerService, 
        private _toastr : ToastrService){}

    @Effect()
    loadLicenses$ : Observable<Action> = this._actions$
    .ofType(training.LOAD)
    .withLatestFrom(
        this._store$.select(fromRoot.getEmployeeId),
    )
    .switchMap( ([action, employeeId]) => {
        return this._service.getTraining(employeeId)
        .map((response) => new training.LoadSuccess(response.data) )
        .catch(err => Observable.of(new training.TrainingError(err) ))

    });



    @Effect()
    save$ : Observable<Action> = this._actions$
    .ofType<training.SaveTraining>(training.SAVE_TRAINING)
    .map( (action) => action.payload)
    .withLatestFrom(
        this._store$.select(fromRoot.getEmployeeId),
    )
    .switchMap(([payload, employeeId]) => {

        this._loader.openDialog();
        if(payload.employeeTrainingId == 0){
        
            
            return this._service.saveTraining(payload,employeeId)
                .map((response) =>  new training.SaveTrainingSuccess() )
                .catch((err) => Observable.of( new training.TrainingError(err) ))
                .do(() => this._loader.closeDialog())
            
        }
        else {

            return this._service.updateTraining(payload)
            .map((response) => new training.SaveTrainingSuccess() )
            .catch((err) => Observable.of( new training.TrainingError(err) ))
            .do(() => this._loader.closeDialog())
        }

        
    })

    @Effect()
    saveSuccess$  = this._actions$
    .ofType(training.SAVE_TRAINING_SUCCESS)
    .do(() => { this._toastr.saveSuccess(); })
    .mergeMap(() => {
        return [
        new training.Load(),
        new training.ClearSelected()
        ];
    })

    @Effect()
    error$ = this._actions$
            .ofType<training.TrainingError>(training.TRAINING_ERROR)
            .map((action) => action.payload)
            .do((payload) => { this._toastr.errorHandler(payload)})
            .filter( payload => payload.status == 422)
            .map(() => new training.ClearSelected() )
}