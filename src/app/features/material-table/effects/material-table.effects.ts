import { Injectable } from "@angular/core";

import { MaterialTableService } from "./../material-table.service";

import { Action } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



import * as mat from './../actions/material-table.actions';
import { Element } from './../models/material-table.model';

@Injectable()
export class MaterialTableEffects {

    constructor(private _service : MaterialTableService, private _actions$ : Actions){}

    @Effect()
    loadCollections$ : Observable<Action> = this._actions$
    .ofType(mat.LOAD_ELEMENTS)
    .switchMap(() => 
        this._service.loadElements()
        .map( (collections : Element[]) => new mat.LoadElementSuccess(collections) )
        .catch( error => of(new mat.SearchError(error)) )
    );
    
}