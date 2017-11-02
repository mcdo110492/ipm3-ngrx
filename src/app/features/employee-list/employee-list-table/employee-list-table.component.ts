import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from "@angular/router";
import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employee-list.actions';
import * as fromRoot from './../reducers';
import { EmployeeList } from "./../models/employee-list.models";

import { EmployeeListTableDatasource } from "./employee-list-table.datasource";


@Component({
  selector: 'app-employee-list-table',
  templateUrl: './employee-list-table.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeListTableComponent implements OnInit {

  displayedColumns = ['profileImage','employeeNumber','lastName','positionName','empploymentStatusName','employeeStatusName','actions'];
  dataSource : EmployeeListTableDatasource | null;
  collections$ : Observable<EmployeeList[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRoot.State>,private _router: Router) {
    this.pageLength$    = this._store$.select(fromRoot.getPageLength);
    this.pageSize$      = this._store$.select(fromRoot.getPageSize);
    this.pageIndex$     = this._store$.select(fromRoot.getPageIndex);
    this.collections$   = this._store$.select(fromRoot.getCollection);
    this.searchQuery$   = this._store$.select(fromRoot.getSearchQuery);
    this.isLoading$     = this._store$.select(fromRoot.getIsLoading);
  }

  ngOnInit() {

    this.dataSource = new EmployeeListTableDatasource(this.collections$);
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

  goToDetails(data : EmployeeList){
    const empNum    = data.employeeNumber,
          empId     = data.employeeId;

    this._router.navigateByUrl(`employee/details/${empNum}/${empId}`);
  }

}
