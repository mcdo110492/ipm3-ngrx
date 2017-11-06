import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employee-club.actions';
import * as fromEmpDetails from './../../reducers';
import { EmployeeClub } from "./../models/employee-club.model";

import { EmployeeClubDatasource } from "./employee-club-table.datasource";
import { EmployeeClubInformationService } from "./../employee-club-information.service";

@Component({
  selector: 'app-employee-club-table',
  templateUrl: './employee-club-table.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeClubTableComponent implements OnInit {

  displayedColumns = ['clubName','clubPosition','membershipDate','actions'];
  dataSource : EmployeeClubDatasource | null;
  collections$ : Observable<EmployeeClub[]>;


  constructor(private _store$ : Store<fromEmpDetails.State>, private _service : EmployeeClubInformationService) {
 
    this.collections$   = this._store$.select(fromEmpDetails.getClub);
  }

  ngOnInit() {

    this.dataSource = new EmployeeClubDatasource(this.collections$);

    this._store$.dispatch( new Actions.Load() );

  }


  openDialogForm() {
    this._service.openFormDialog();
  }


  openUpdateDialogForm(data : EmployeeClub){
    
      this._store$.dispatch( new Actions.SelectedClub(data) );
    
      this._service.openFormDialog();
    
  }

}
