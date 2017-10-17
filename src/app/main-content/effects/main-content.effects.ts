import { Injectable } from '@angular/core';

import { Action } from "@ngrx/store";
import { Actions, Effect } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';


import * as mainActions from './../actions/main-content.actions';


import { LoaderSpinnerService } from "./../services/loader-spinner/loader-spinner.service";

@Injectable()
export class MainContentEffects {

    constructor(private _actions$ : Actions, private _spinner : LoaderSpinnerService){}

    /**
     * Listen to the Action to open the spinner
     */
    @Effect({ dispatch: false }) openSpinner  = this._actions$.ofType<mainActions.OpenLoaderSpinner>(mainActions.OPEN_LOADER_SPINNER)
        .do(action => 
          this._spinner.openDialog()
        );
    /**
     * Listen to the Action to close the spinner
     */
    @Effect({ dispatch: false }) closeSpinner  = this._actions$.ofType<mainActions.CloseLoaderSpinner>(mainActions.CLOSE_LOADER_SPINNER)
        .do(action => 
          this._spinner.closeDialog()
        );

}