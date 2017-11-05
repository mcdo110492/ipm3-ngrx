import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employee-educational.actions';
import * as fromEmpDetails from './../../reducers';
import { EmployeeEducational } from "./../models/employee-educational.model";

import { EmployeeEducationalDatasource } from "./employee-educational-table.datasource";
import { EmployeeEducationalService } from "./../employee-educational.service";

@Component({
  selector: 'app-employee-educational-table',
  templateUrl: './employee-educational-table.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationalTableComponent implements OnInit {

  displayedColumns = ['schoolName','schoolAddress','schoolYear','degree','major','minor','awards','actions'];
  dataSource : EmployeeEducationalDatasource | null;
  collections$ : Observable<EmployeeEducational[]>;


  constructor(private _store$ : Store<fromEmpDetails.State>, private _service : EmployeeEducationalService) {
 
    this.collections$   = this._store$.select(fromEmpDetails.getEducational);
  }

  ngOnInit() {

    this.dataSource = new EmployeeEducationalDatasource(this.collections$);

    this._store$.dispatch( new Actions.Load() );

  }


  openDialogForm() {
    this._service.openFormDialog();
  }


  openUpdateDialogForm(data : EmployeeEducational){
    
      this._store$.dispatch( new Actions.SelectedEducational(data) );
    
      this._service.openFormDialog();
    
  }

}
