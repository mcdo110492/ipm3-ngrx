import { Injectable } from '@angular/core';

import { Action, Store } from "@ngrx/store";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from 'rxjs/Observable';
import { of } from "rxjs/observable/of";
import { map, switchMap, mergeMap, catchError, withLatestFrom, debounceTime, tap, distinctUntilChanged, filter } from "rxjs/operators";

import * as projectActions from './../actions/project-table.actions';
import * as fromRootProjects from './../reducers';
import { Projects } from './../models/projects.model';

import { ProjectsService } from "./../projects.service";

import { LoaderSpinnerService } from "./../../../main-content/services/loader-spinner/loader-spinner.service";
import { ToastrService } from "./../../../main-content/services/toastr.service";

@Injectable()
export class ProjectsTableEffects {

    constructor(private _service : ProjectsService, private _actions$ : Actions, private _store$ : Store<fromRootProjects.State>, private _loader : LoaderSpinnerService, private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(projectActions.LOAD)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRootProjects.getCollectionPageIndex),
                this._store$.select(fromRootProjects.getCollectionPageSize),
                this._store$.select(fromRootProjects.getCollectionSortField),
                this._store$.select(fromRootProjects.getCollectionSortDirection),
                this._store$.select(fromRootProjects.getCollectionSearchQuery)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        map((response) => new projectActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new projectActions.LoadError(err) ))
                    )    
            })
        );

    @Effect()
        search$ : Observable<Action> = this._actions$
        .ofType(projectActions.SEARCH)
        .pipe(
            withLatestFrom(
                this._store$.select(fromRootProjects.getCollectionPageIndex),
                this._store$.select(fromRootProjects.getCollectionPageSize),
                this._store$.select(fromRootProjects.getCollectionSortField),
                this._store$.select(fromRootProjects.getCollectionSortDirection),
                this._store$.select(fromRootProjects.getCollectionSearchQuery)
            ),
            debounceTime(300),
            distinctUntilChanged(),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery]) => {
                return this._service.loadData(pageIndex,pageSize,sortField,sortDirection,searchQuery)
                    .pipe(
                        map((response) => new projectActions.LoadSuccess(response.data,response.count) ),
                        catchError(err => of(new projectActions.LoadError(err) ))
                    )
    
            })
        );

    @Effect()
        save$ : Observable<Action> = this._actions$
        .ofType<projectActions.SaveProject>(projectActions.SAVE_PROJECT)
        .pipe(
            map( (action) => action.payload),
            switchMap((payload) => {
    
                this._loader.openDialog();
                if(payload.projectId == 0){
                
                    return this._service.save(payload)
                        .pipe(
                            map((response) =>  new projectActions.SaveSuccess(response.status) ),
                            catchError((err) => of( new projectActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(payload)
                        .pipe(
                            map((response) =>  new projectActions.SaveSuccess(response.status) ),
                            catchError((err) => of( new projectActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );
        
    @Effect()
        saveSuccess$  = this._actions$
                       .ofType(projectActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            mergeMap(() => {
                                return [
                                    new projectActions.Load(),
                                    new projectActions.ClearSelectProject()
                                ];
                            })
                       );
                       

                       

    @Effect()
        error$ = this._actions$
                 .ofType<projectActions.LoadError>(projectActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new projectActions.ClearSelectProject() )
                 );
                 
            
}
