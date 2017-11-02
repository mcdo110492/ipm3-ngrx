import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Action } from "@ngrx/store";
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';


import * as mainActions from './../actions/main-content.actions';


import { LoaderSpinnerService } from "./../services/loader-spinner/loader-spinner.service";

@Injectable()
export class MainContentEffects {

    constructor(private _actions$ : Actions, private _spinner : LoaderSpinnerService, private _router : Router){}

    @Effect({dispatch : false})
        changeProject$ = this._actions$
        .ofType<mainActions.ChangeProject>(mainActions.CHANGE_PROJECT)
        .map((action) => {
            localStorage.setItem('projectId',action.payload.toString());
            this._router.navigateByUrl('/projects');
        });
 
   

}