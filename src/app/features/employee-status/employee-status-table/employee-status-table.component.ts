import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employee-status.actions';
import * as fromRoot from './../reducers';
import { EmployeeStatus } from "./../models/employee-status.model";

import { EmployeeStatusTableDatasource } from "./employee-status-table.datasource";
import { EmployeeStatusService } from "./../employee-status.service";



@Component({
  selector: 'app-employee-status-table',
  templateUrl: './employee-status-table.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeStatusTableComponent implements OnInit {

  displayedColumns = ['employeeStatusCode','employeeStatusName','actions'];
  dataSource : EmployeeStatusTableDatasource | null;
  collections$ : Observable<EmployeeStatus[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRoot.State>, private _service : EmployeeStatusService) {
    this.pageLength$   = this._store$.select(fromRoot.getPageLength);
    this.pageSize$     = this._store$.select(fromRoot.getPageSize);
    this.pageIndex$    = this._store$.select(fromRoot.getPageIndex);
    this.collections$  = this._store$.select(fromRoot.getCollection);
    this.searchQuery$   = this._store$.select(fromRoot.getSearchQuery);
    this.isLoading$     = this._store$.select(fromRoot.getIsLoading);
  }

  ngOnInit() {

    this.dataSource = new EmployeeStatusTableDatasource(this.collections$);
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

  openUpdateDialogForm(data : EmployeeStatus){

    this._store$.dispatch( new Actions.SelectEmployeeStatus(data) );

    this._service.openFormDialog();

  }


}
