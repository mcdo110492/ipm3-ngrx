import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as unitsActions from './../actions/units.actions';
import * as fromRootUnits from './../reducers';
import { Units } from "./../models/units.model";

import { UnitsTableDatasource } from "./units-table.datasource";
import { UnitsService } from "./../units.service";

@Component({
  selector: 'app-units-table',
  templateUrl: './units-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitsTableComponent implements OnInit {

  displayedColumns = ['unitCode','unitName','actions'];
  dataSource : UnitsTableDatasource | null;
  collections$ : Observable<Units[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootUnits.State>, private _service : UnitsService) {
    this.pageLength$   = this._store$.select(fromRootUnits.getCollectionPageLength);
    this.pageSize$     = this._store$.select(fromRootUnits.getCollectionPageSize);
    this.pageIndex$    = this._store$.select(fromRootUnits.getCollectionPageIndex);
    this.collections$  = this._store$.select(fromRootUnits.getCollectionData);
    this.searchQuery$   = this._store$.select(fromRootUnits.getCollectionSearchQuery);
    this.isLoading$     = this._store$.select(fromRootUnits.getCollectionIsLoading);
  }

  ngOnInit() {

    this.dataSource = new UnitsTableDatasource(this.collections$);
    this._store$.dispatch( new unitsActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new unitsActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new unitsActions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new unitsActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new unitsActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new unitsActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(units : Units){

    this._store$.dispatch( new unitsActions.SelectUnits(units) );

    this._service.openFormDialog();

  }

}
