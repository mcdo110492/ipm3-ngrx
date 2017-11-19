import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PageEvent, Sort } from "@angular/material";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as collectionTypesActions from './../actions/collection-types.actions';
import * as fromRootCollectionTypes from './../reducers';
import { CollectionTypes } from "./../models/collection-types.model";

import { CollectionTypesTableDatasource } from "./collection-types-table.datasource";
import { CollectionTypesService } from "./../collection-types.service";


@Component({
  selector: 'app-collection-types-table',
  templateUrl: './collection-types-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionTypesTableComponent implements OnInit {

  displayedColumns = ['collectionTypeCode','collectionTypeName','actions'];
  dataSource : CollectionTypesTableDatasource | null;
  collections$ : Observable<CollectionTypes[]>;

  pageLength$   : Observable<number>;
  pageSize$     : Observable<number>;
  pageIndex$    : Observable<number>;
  pageSizeOptions = [5,10,15,30,50,100];

  searchQuery$ : Observable<string>;
  isLoading$   : Observable<boolean>;

  constructor(private _store$ : Store<fromRootCollectionTypes.State>, private _service : CollectionTypesService) {
    this.pageLength$   = this._store$.select(fromRootCollectionTypes.getCollectionPageLength);
    this.pageSize$     = this._store$.select(fromRootCollectionTypes.getCollectionPageSize);
    this.pageIndex$    = this._store$.select(fromRootCollectionTypes.getCollectionPageIndex);
    this.collections$  = this._store$.select(fromRootCollectionTypes.getCollectionData);
    this.searchQuery$   = this._store$.select(fromRootCollectionTypes.getCollectionSearchQuery);
    this.isLoading$     = this._store$.select(fromRootCollectionTypes.getCollectionIsLoading);
  }

  ngOnInit() {

    this.dataSource = new CollectionTypesTableDatasource(this.collections$);
    this._store$.dispatch( new collectionTypesActions.Load() );


  }

  pageEvent(ev : PageEvent){

    this._store$.dispatch( new collectionTypesActions.Paginate(ev.pageSize,ev.pageIndex) );

    this._store$.dispatch( new collectionTypesActions.Load() );

  }

  sortEvent(ev : Sort){

    this._store$.dispatch(new collectionTypesActions.Sort(ev.active,ev.direction) );
    this._store$.dispatch( new collectionTypesActions.Load() );

  }

  search(ev : string){

    this._store$.dispatch( new collectionTypesActions.Search(ev) );

  }

  openDialogForm(){

    this._service.openFormDialog();

  }

  openUpdateDialogForm(data : CollectionTypes){

    this._store$.dispatch( new collectionTypesActions.SelectCollectionTypes(data) );

    this._service.openFormDialog();

  }

}
