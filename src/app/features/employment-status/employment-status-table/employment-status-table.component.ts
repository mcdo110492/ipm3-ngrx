import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employment-status.actions';
import * as fromRoot from './../reducers';
import { EmploymentStatus } from "./../models/employment-status.model";

import { EmploymentStatusTableDatasource } from "./employment-status-table.datasource";
import { EmploymentStatusService } from "./../employment-status.service";


@Component({
  selector: 'app-employment-status-table',
  templateUrl: './employment-status-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmploymentStatusTableComponent implements OnInit {

  displayedColumns = ['employmentStatusName','actions'];
  dataSource : EmploymentStatusTableDatasource | null;
  collections$ : Observable<EmploymentStatus[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRoot.State>, private _service : EmploymentStatusService) {
    this.pageLength$   = this._store$.select(fromRoot.getPageLength);
    this.pageSize$     = this._store$.select(fromRoot.getPageSize);
    this.pageIndex$    = this._store$.select(fromRoot.getPageIndex);
    this.collections$  = this._store$.select(fromRoot.getCollection);
    this.searchQuery$   = this._store$.select(fromRoot.getSearchQuery);
    this.isLoading$     = this._store$.select(fromRoot.getIsLoading);
  }

  ngOnInit() {

    this.dataSource = new EmploymentStatusTableDatasource(this.collections$);
    this._store$.dispatch( new Actions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new Actions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new Actions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new Actions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new Actions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new Actions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(data : EmploymentStatus){

    this._store$.dispatch( new Actions.SelectEmploymentStatus(data) );

    this._service.openFormDialog();

  }

}
