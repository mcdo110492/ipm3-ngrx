import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import * as Actions from './../actions/employee-training.actions';
import * as fromEmpDetails from './../../reducers';
import { EmployeeTraining } from "./../models/employee-training.model";

import { EmployeeTrainingDatasource } from "./employee-training-table.datasource";
import { EmployeeTrainingInformationService } from "./../employee-training-information.service";


@Component({
  selector: 'app-employee-training-table',
  templateUrl: './employee-training-table.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeTrainingTableComponent implements OnInit {

  displayedColumns = ['trainingTitle','trainingName','trainingFrom','trainingTo','actions'];
  dataSource : EmployeeTrainingDatasource | null;
  collections$ : Observable<EmployeeTraining[]>;


  constructor(private _store$ : Store<fromEmpDetails.State>, private _service : EmployeeTrainingInformationService) {
 
    this.collections$   = this._store$.select(fromEmpDetails.getTraining);
  }

  ngOnInit() {

    this.dataSource = new EmployeeTrainingDatasource(this.collections$);

    this._store$.dispatch( new Actions.Load() );

  }


  openDialogForm() {
    this._service.openFormDialog();
  }


  openUpdateDialogForm(data : EmployeeTraining){
    
      this._store$.dispatch( new Actions.SelectedTraining(data) );
    
      this._service.openFormDialog();
    
  }

}
