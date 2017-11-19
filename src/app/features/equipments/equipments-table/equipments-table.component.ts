import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as equipmentsActions from './../actions/equipments.actions';
import * as fromRootEquipments from './../reducers';
import { Equipment } from "./../models/equipments.model";

import { EquipmentsTableDatasource } from "./equipments-table.datasource";
import { EquipmentsService } from "./../equipments.service";



@Component({
  selector: 'app-equipments-table',
  templateUrl: './equipments-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EquipmentsTableComponent implements OnInit {

  displayedColumns = ['equipmentCode','bodyNumber','unitId','model','capacity','plateNo','status','remarks','actions'];
  dataSource : EquipmentsTableDatasource | null;
  collections$ : Observable<Equipment[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootEquipments.State>, private _service : EquipmentsService) {
    this.pageLength$   = this._store$.select(fromRootEquipments.getCollectionPageLength);
    this.pageSize$     = this._store$.select(fromRootEquipments.getCollectionPageSize);
    this.pageIndex$    = this._store$.select(fromRootEquipments.getCollectionPageIndex);
    this.collections$  = this._store$.select(fromRootEquipments.getCollectionData);
    this.searchQuery$   = this._store$.select(fromRootEquipments.getCollectionSearchQuery);
    this.isLoading$     = this._store$.select(fromRootEquipments.getCollectionIsLoading);
  }

  ngOnInit() {

    this.dataSource = new EquipmentsTableDatasource(this.collections$);
    this._store$.dispatch( new equipmentsActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new equipmentsActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new equipmentsActions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new equipmentsActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new equipmentsActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new equipmentsActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(data : Equipment){

    this._store$.dispatch( new equipmentsActions.SelectEquipments(data) );

    this._service.openFormDialog();

  }

  changeStatus(id : number , status : number){

    this._store$.dispatch( new equipmentsActions.ChangeStatus({ id, status }) );

  }

}
