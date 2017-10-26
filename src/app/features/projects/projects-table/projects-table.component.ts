import { Component, OnInit } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as projectActions from './../actions/project-table.actions';
import * as fromRootProjects from './../reducers';
import { Projects } from "./../models/projects.model";

import { ProjectsTableDatasource } from "./projects-table.datasource";
import { ProjectsService } from "./../projects.service";

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss']
})
export class ProjectsTableComponent implements OnInit {

  displayedColumns = ['projectCode','projectName','actions'];
  dataSource : ProjectsTableDatasource | null;
  collections$ : Observable<Projects[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [2,5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootProjects.State>, private _service : ProjectsService) {
    this.pageLength$   = this._store$.select(fromRootProjects.getCollectionPageLength);
    this.pageSize$     = this._store$.select(fromRootProjects.getCollectionPageSize);
    this.pageIndex$    = this._store$.select(fromRootProjects.getCollectionPageIndex);
    this.collections$  = this._store$.select(fromRootProjects.getCollectionData);
    this.searchQuery$   = this._store$.select(fromRootProjects.getCollectionSearchQuery);
    this.isLoading$     = this._store$.select(fromRootProjects.getCollectionIsLoading);
  }

  ngOnInit() {

    this.dataSource = new ProjectsTableDatasource(this.collections$);
    this._store$.dispatch( new projectActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new projectActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new projectActions.Load() );
  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new projectActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new projectActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new projectActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(project : Projects){

    this._store$.dispatch( new projectActions.SelectProject(project) );

    this._service.openFormDialog();

  }


}
