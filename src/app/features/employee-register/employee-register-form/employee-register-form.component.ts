import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { FormBuilder, FormGroup , Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';

import { Projects } from "./../../projects/models/projects.model";
import { Position } from "./../../positions/models/positions.model";
import { EmploymentStatus } from "./../../employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../../employee-status/models/employee-status.model";

import * as masterDataActions from './../../../master-data/actions/master-data.actions';
import * as fromMasterData from './../../../master-data/reducers/master-data.reducers';

@Component({
  selector: 'app-employee-register-form',
  templateUrl: './employee-register-form.component.html',
  styleUrls : ['./employee-register-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeRegisterFormComponent implements OnInit {

  personalForm      : FormGroup;
  employmentForm    : FormGroup;
  doneForm          : FormGroup;
  civilStatuses     : string[] = ['Single','Married','Divorced','Widowed'];
  projects          : Observable<Projects[]>;
  positions         : Observable<Position[]>;
  employmentStatus  : Observable<EmploymentStatus[]>;
  employeeStatus    : Observable<EmployeeStatus[]>;

  constructor(private _fb : FormBuilder, private _store : Store<fromMasterData.State>) {
    this.createForm();

    this.projects         = this._store.select(fromMasterData.getProjects);
    this.positions        = this._store.select(fromMasterData.getPositions);
    this.employmentStatus = this._store.select(fromMasterData.getEmploymentStatus);
    this.employeeStatus   = this._store.select(fromMasterData.getEmployeeStatus);
  }

  ngOnInit() {
    this._store.dispatch( new masterDataActions.GetAllPositions() );
    this._store.dispatch( new masterDataActions.GetAllEmployeeStatus() );
    this._store.dispatch( new masterDataActions.GetAllEmploymentStatus() );
  }

  createForm(){

    this.personalForm = this._fb.group({
      employeeNumber      : [null,Validators.required],
      firstName           : [null,Validators.required],
      middleName          : [null,Validators.required],
      lastName            : [null,Validators.required],
      birthday            : [null,Validators.required],
      placeOfBirth        : [null,Validators.required],
      civilStatus         : [null,Validators.required],
      citizenship         : [null,Validators.required],
      religion            : [null,Validators.required]
    });

    this.employmentForm = this._fb.group({
      positionId              : [null,Validators.required],
      employeeStatusId        : [null,Validators.required],
      employmentStatusId      : [null,Validators.required],
      contractStart           : [null,Validators.required],
      contractEnd             : [null,Validators.required]
    });
  }

}
