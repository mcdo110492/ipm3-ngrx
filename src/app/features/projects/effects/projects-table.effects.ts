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

import * as fromMasterData from './../../../master-data/reducers/master-data.reducers';
import * as masterDataActions from './../../../master-data/actions/master-data.actions';

@Injectable()
export class ProjectsTableEffects {

    constructor(private _service : ProjectsService, 
                private _actions$ : Actions, 
                private _store$ : Store<fromRootProjects.State>, 
                private _masterStore$ : Store<fromMasterData.State>,
                private _loader : LoaderSpinnerService, 
                private _toastr : ToastrService){}

    @Effect()
        loadData$ : Observable<Action> = this._actions$
        .ofType(projectActions.LOAD)
        .pipe(
            tap(() => new projectActions.IsLoading(true) ),
            withLatestFrom(
                this._store$.select(fromRootProjects.getCollectionPageIndex),
                this._store$.select(fromRootProjects.getCollectionPageSize),
                this._store$.select(fromRootProjects.getCollectionSortField),
                this._store$.select(fromRootProjects.getCollectionSortDirection),
                this._store$.select(fromRootProjects.getCollectionSearchQuery),
                this._store$.select(fromRootProjects.getCollectionIsLoaded)
            ),
            switchMap( ([action, pageIndex, pageSize, sortField, sortDirection,searchQuery,isLoaded]) => {

                if(isLoaded){
                    return of(new projectActions.IsLoading(false));
                }

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
            tap(() => new projectActions.IsLoading(true)),
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
                        tap(() => new projectActions.IsLoading(false)),
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
                            mergeMap((response) => {
                                return [
                                    new projectActions.CreateProject(),
                                    new projectActions.SaveSuccess(response.status),
                                    new projectActions.Load(),
                                    new masterDataActions.AddNewProject(response.createdData)         
                                ];
                            }),
                            catchError((err) => of( new projectActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                
                }
                else {
    
                    return this._service.update(payload)
                        .pipe(
                            mergeMap((response) => {
                                return [
                                    new projectActions.SaveSuccess(response.status),
                                    new projectActions.UpdateSuccess({ id: payload.projectId, updatedData: payload  }),
                                    new masterDataActions.UpdateProject({ id: payload.projectId, updatedData: payload  })
                                ];
                            }),
                            catchError((err) => of( new projectActions.LoadError(err) )),
                            tap(() => this._loader.closeDialog())
                        )
                }
    
            })    
        );
        
    @Effect()
        saveSuccess$ : Observable<Action>  = this._actions$
                       .ofType(projectActions.SAVE_SUCCESS)
                       .pipe(
                            tap(() => { this._toastr.saveSuccess(); }),
                            map(() =>  new projectActions.ClearSelectProject())
                           
                       );
                       

                       

    @Effect()
        error$ : Observable<Action> = this._actions$
                 .ofType<projectActions.LoadError>(projectActions.LOAD_ERROR)
                 .pipe(
                    map((action) => action.payload),
                    tap((payload) => { this._toastr.errorHandler(payload)}),
                    filter( payload => payload.status == 422 ),
                    map(() => new projectActions.ClearSelectProject() )
                 );
                 
            
}
