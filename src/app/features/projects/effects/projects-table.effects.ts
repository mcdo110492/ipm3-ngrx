import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';




import * as projectActions from './../actions/project-table.actions';
import * as fromRootProjects from './../reducers';
import { Projects } from './../models/projects.model';

import { ProjectsService } from "./../projects.service";

@Injectable()
export class ProjectsTableEffects {

    constructor(private _service : ProjectsService, private _actions$ : Actions, private _store$ : Store<fromRootProjects.State>){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(projectActions.LOAD)
        .withLatestFrom(
            this._store$.select(fromRootProjects.getCollectionPageIndex),
            this._store$.select(fromRootProjects.getCollectionPageSize),
            this._store$.select(fromRootProjects.getCollectionSortField),
            this._store$.select(fromRootProjects.getCollectionSortDirection),
            this._store$.select(fromRootProjects.getCollectionSearchQuery)
        )
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new projectActions.LoadSuccess(response.data,response.count) )
            .catch(err => of(new projectActions.LoadError(err) ))

        });

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(projectActions.SEARCH)
        .withLatestFrom(
            this._store$.select(fromRootProjects.getCollectionPageIndex),
            this._store$.select(fromRootProjects.getCollectionPageSize),
            this._store$.select(fromRootProjects.getCollectionSortField),
            this._store$.select(fromRootProjects.getCollectionSortDirection),
            this._store$.select(fromRootProjects.getCollectionSearchQuery)
        )
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
            return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
            .map((response) => new projectActions.LoadSuccess(response.data,response.count) )
            .catch(err => of(new projectActions.LoadError(err) ))

        });

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<projectActions.SaveProject>(projectActions.SAVE_PROJECT)
        .map( (action) => action.payload)
        .switchMap((payload) => {
            console.log(payload);
            return of( new projectActions.SaveSuccess('success') );
        });
  
}
