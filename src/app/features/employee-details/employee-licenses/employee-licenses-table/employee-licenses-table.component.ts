import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employee-license.actions';
import * as fromEmpDetails from './../../reducers';
import { EmployeeLicense } from "./../models/employee-licenses.models";

import { EmployeeLicensesDatasource } from "./employee-licenses-table.datasource";
import { EmployeeLicensesService } from "./../employee-licenses.service";

@Component({
  selector: 'app-employee-licenses-table',
  templateUrl: './employee-licenses-table.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeLicensesTableComponent implements OnInit {

  displayedColumns = ['licenseNumber','licenseType','dateIssued','dateExpiry','actions'];
  dataSource : EmployeeLicensesDatasource | null;
  collections$ : Observable<EmployeeLicense[]>;


  constructor(private _store$ : Store<fromEmpDetails.State>, private _service : EmployeeLicensesService) {
 
    this.collections$   = this._store$.select(fromEmpDetails.getLicenses);
  }

  ngOnInit() {

    this.dataSource = new EmployeeLicensesDatasource(this.collections$);

    this._store$.dispatch( new Actions.Load() );

  }


  openDialogForm() {
    this._service.openFormDialog();
  }


  openUpdateDialogForm(data : EmployeeLicense){
    
      this._store$.dispatch( new Actions.SelectedLicense(data) );
    
      this._service.openFormDialog();
    
  }


}
