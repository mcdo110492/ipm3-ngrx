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

 
   

}