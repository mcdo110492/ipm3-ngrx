import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as shiftsActions from './../actions/shifts.actions';
import * as fromRootShifts from './../reducers';
import { Shifts } from "./../models/shifts.model";

import { ShiftsTableDatasource } from "./shifts-table.datasource";
import { ShiftsService } from "./../shifts.service";



@Component({
  selector: 'app-shifts-table',
  templateUrl: './shifts-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShiftsTableComponent implements OnInit {

  displayedColumns = ['bodyNumber','collectionScheduleName','collectionTypeName','geofenceName','sectors','shiftTime','actions'];
  dataSource : ShiftsTableDatasource | null;
  collections$ : Observable<Shifts[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootShifts.State>, private _service : ShiftsService) {
    this.pageLength$   = this._store$.select(fromRootShifts.getCollectionPageLength);
    this.pageSize$     = this._store$.select(fromRootShifts.getCollectionPageSize);
    this.pageIndex$    = this._store$.select(fromRootShifts.getCollectionPageIndex);
    this.collections$  = this._store$.select(fromRootShifts.getCollectionData);
    this.searchQuery$   = this._store$.select(fromRootShifts.getCollectionSearchQuery);
    this.isLoading$     = this._store$.select(fromRootShifts.getCollectionIsLoading);
  }

  ngOnInit() {

    this.dataSource = new ShiftsTableDatasource(this.collections$);
    this._store$.dispatch( new shiftsActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new shiftsActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new shiftsActions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new shiftsActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new shiftsActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new shiftsActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(data : Shifts){

    this._store$.dispatch( new shiftsActions.SelectShifts(data) );

    this._service.openFormDialog();

  }

  changeStatus(id : number , status : number){

    this._store$.dispatch( new shiftsActions.ChangeStatus({ id, status }) );

  }

}
