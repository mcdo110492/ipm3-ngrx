import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import * as masterActions from './../../../master-data/actions/master-data.actions';
import * as fromMaster from './../../../master-data/reducers/master-data.reducers';

import * as employmentActions from './actions/employee-employment.actions';
import * as fromRoot from "./../reducers";

import { EmployeeEmployment } from "./models/employee-employment.model";
import { Position } from "./../../positions/models/positions.model";
import { EmploymentStatus } from "./../../employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../../employee-status/models/employee-status.model";

@Component({
  selector: 'app-employee-employment-information',
  templateUrl: './employee-employment-information.component.html',
  styleUrls: ['./employee-employment-information.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeEmploymentInformationComponent implements OnInit {
  
  employmentForm    : FormGroup;
  employmentData    : Observable<EmployeeEmployment>;
  positions         : Observable<Position[]>;
  employmentStatus  : Observable<EmploymentStatus[]>;
  employeeStatus    : Observable<EmployeeStatus[]>;

  constructor(private _fb : FormBuilder,
              private _masterState : Store<fromMaster.State>,
              private _store : Store<fromRoot.State>) 
  { 
    this.createForm();

    this.positions          = this._masterState.select(fromMaster.getPositions);
    this.employmentStatus   = this._masterState.select(fromMaster.getEmploymentStatus);
    this.employeeStatus     = this._masterState.select(fromMaster.getEmployeeStatus);

    this.employmentData     = this._store.select(fromRoot.getEmployment);

  }

  ngOnInit() {

    
    this._masterState.dispatch( new masterActions.GetAllPositions() );
    this._masterState.dispatch( new masterActions.GetAllEmployeeStatus() );
    this._masterState.dispatch( new masterActions.GetAllEmploymentStatus() );

    this._store.dispatch( new employmentActions.GetEmployment() );

    this.employmentData
    .take(2)
    .subscribe((data : EmployeeEmployment) => {
      if(data !== undefined){
        this.employmentForm.patchValue(data)
      }
    });
    
  }


  createForm() {
    
    this.employmentForm = this._fb.group({
      employeeEmploymentId    : [null,Validators.required],
      employeeId              : [null,Validators.required],
      positionId              : [null,Validators.required],
      employmentStatusId      : [null,Validators.required],
      employeeStatusId        : [null,Validators.required],
      contractStart           : [null,Validators.required],
      contractEnd             : [null,Validators.required],
      salary                  : [null,Validators.required],
      remarks                 : [null,Validators.required]
    });

  }

  save() {
    this._store.dispatch( new employmentActions.SaveEmployment(this.employmentForm.value) );
  }

}
