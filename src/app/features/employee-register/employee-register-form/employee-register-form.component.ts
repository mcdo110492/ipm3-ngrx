import { Component, OnInit, ChangeDetectionStrategy ,Output, EventEmitter, OnDestroy } from '@angular/core';

import { FormBuilder, FormGroup , Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounceTime';

import { Position } from "./../../positions/models/positions.model";
import { EmploymentStatus } from "./../../employment-status/models/employment-status.model";
import { EmployeeStatus } from "./../../employee-status/models/employee-status.model";

import * as masterDataActions from './../../../master-data/actions/master-data.actions';
import * as fromMasterData from './../../../master-data/reducers/master-data.reducers';

import * as empFormActions from './../actions/employee-register.actions';
import * as fromEmployeeRegister from './../reducers';


import { EmployeeRegister, Personal, Employment } from "./../models/employee-register.model";

@Component({
  selector: 'app-employee-register-form',
  templateUrl: './employee-register-form.component.html',
  styleUrls : ['./employee-register-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeRegisterFormComponent implements OnInit ,OnDestroy {

  @Output() submit    : EventEmitter<any> = new EventEmitter<any>();

  personalForm      : FormGroup;
  employmentForm    : FormGroup;
  doneForm          : FormGroup;
  civilStatuses     : string[] = ['Single','Married','Divorced','Widowed'];
  positions         : Observable<Position[]>;
  employmentStatus  : Observable<EmploymentStatus[]>;
  employeeStatus    : Observable<EmployeeStatus[]>;
  subscription      : Subscription;

  constructor(private _fb : FormBuilder, private _masterStore : Store<fromMasterData.State>, private _empStore : Store<fromEmployeeRegister.State>) {
    this.createForm();
    // Get the State of Master Data
    this.positions        = this._masterStore.select(fromMasterData.getPositions);
    this.employmentStatus = this._masterStore.select(fromMasterData.getEmploymentStatus);
    this.employeeStatus   = this._masterStore.select(fromMasterData.getEmployeeStatus);
  }


  ngOnInit() {
    //Dispatch an Actions from Master Data to fetch the data in the backend
    this._masterStore.dispatch( new masterDataActions.GetAllPositions() );
    this._masterStore.dispatch( new masterDataActions.GetAllEmployeeStatus() );
    this._masterStore.dispatch( new masterDataActions.GetAllEmploymentStatus() );
   //Subscribe to valueChanges of personalForm to save the state of the form from the store
   this.subscription = this.personalForm.valueChanges
   .debounceTime(500)
    .subscribe((value : Personal) => {
      const data : EmployeeRegister = {
        personal    : value,
        employment  : this.employmentForm.value
      };
      this._empStore.dispatch( new empFormActions.Save(data) );
    });
    //Subscribe to valueChanges of employmentForm to save the state of the form from the store
    this.subscription.add(
      this.employmentForm.valueChanges
      .debounceTime(500)
      .subscribe((value : Employment) => {
        const data : EmployeeRegister = {
          personal    : this.personalForm.value,
          employment  : value
        };
        this._empStore.dispatch( new empFormActions.Save(data) );
      })
    );

    //Get the state of the form from the store if it is null and set the value of each form on the first emitted values and automatically unsubscribe to it
      this._empStore.select(fromEmployeeRegister.getEmployeeRegister)
      .take(1)
      .subscribe((formData : EmployeeRegister) => {
        if(formData != null){
          this.personalForm.setValue(formData.personal);
          this.employmentForm.setValue(formData.employment);
        }
      });
    

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


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
