import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as positionActions from './../actions/position.actions';
import * as fromRootPosition from './../reducers';
import { Position } from "./../models/positions.model";

import { PositionsTableDatasource } from "./positions-table.datasource";
import { PositionsService } from "./../positions.service";


@Component({
  selector: 'app-positions-table',
  templateUrl: './positions-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionsTableComponent implements OnInit {

  displayedColumns = ['positionCode','positionName','actions'];
  dataSource : PositionsTableDatasource | null;
  collections$ : Observable<Position[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootPosition.State>, private _service : PositionsService) {
    this.pageLength$   = this._store$.select(fromRootPosition.getPageLength);
    this.pageSize$     = this._store$.select(fromRootPosition.getPageSize);
    this.pageIndex$    = this._store$.select(fromRootPosition.getPageIndex);
    this.collections$  = this._store$.select(fromRootPosition.getCollection);
    this.searchQuery$   = this._store$.select(fromRootPosition.getSearchQuery);
    this.isLoading$     = this._store$.select(fromRootPosition.getIsLoading);
  }

  ngOnInit() {

    this.dataSource = new PositionsTableDatasource(this.collections$);
    this._store$.dispatch( new positionActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new positionActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new positionActions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new positionActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new positionActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new positionActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(data : Position){

    this._store$.dispatch( new positionActions.SelectPosition(data) );

    this._service.openFormDialog();

  }

}
