import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as collectionSchedulesActions from './../actions/collection-schedules.actions';
import * as fromRootCollectionSchedules from './../reducers';
import { CollectionSchedules } from "./../models/collection-schedules.model";

import { CollectionSchedulesTableDatasource } from "./collection-schedules-table.datasource";
import { CollectionSchedulesService } from "./../collection-schedules.service";


@Component({
  selector: 'app-collection-schedules-table',
  templateUrl: './collection-schedules-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionSchedulesTableComponent implements OnInit {

  displayedColumns = ['collectionScheduleCode','collectionScheduleName','actions'];
  dataSource : CollectionSchedulesTableDatasource | null;
  collections$ : Observable<CollectionSchedules[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootCollectionSchedules.State>, private _service : CollectionSchedulesService) {
    this.pageLength$   = this._store$.select(fromRootCollectionSchedules.getCollectionPageLength);
    this.pageSize$     = this._store$.select(fromRootCollectionSchedules.getCollectionPageSize);
    this.pageIndex$    = this._store$.select(fromRootCollectionSchedules.getCollectionPageIndex);
    this.collections$  = this._store$.select(fromRootCollectionSchedules.getCollectionData);
    this.searchQuery$   = this._store$.select(fromRootCollectionSchedules.getCollectionSearchQuery);
    this.isLoading$     = this._store$.select(fromRootCollectionSchedules.getCollectionIsLoading);
  }

  ngOnInit() {

    this.dataSource = new CollectionSchedulesTableDatasource(this.collections$);
    this._store$.dispatch( new collectionSchedulesActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new collectionSchedulesActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new collectionSchedulesActions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new collectionSchedulesActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new collectionSchedulesActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new collectionSchedulesActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(data : CollectionSchedules){

    this._store$.dispatch( new collectionSchedulesActions.SelectCollectionSchedules(data) );

    this._service.openFormDialog();

  }

}
