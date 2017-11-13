import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../reducers';
import * as Actions from './../actions/employee-status.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { EmployeeStatus } from "./../models/employee-status.model";


@Component({
  selector: 'app-employee-status-form',
  templateUrl: './employee-status-form.component.html'
})
export class EmployeeStatusFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  employeeStatusForm : FormGroup;
  selectedEmployeeStatus$ : Observable<EmployeeStatus>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmployeeStatusFormComponent>, private _store$ : Store<fromRoot.State>) {  

    this.createForm(); 

    this.selectedEmployeeStatus$ = this._store$.select(fromRoot.getSelectedCollection);

  }


  ngOnInit() {
    
    this.subscription = this.selectedEmployeeStatus$.subscribe((response) => {
      if(response != null){

        this.employeeStatusForm.setValue({
          employeeStatusId           : response.employeeStatusId,
          employeeStatusCode         : response.employeeStatusCode,
          employeeStatusName         : response.employeeStatusName
        });

      }
    });

  }

  getCurrentId() {
    return this.employeeStatusForm.get('employeeStatusId').value;
  }

  createForm() {
    this.employeeStatusForm = this._fb.group({
      employeeStatusId    :  [0,Validators.required],
      employeeStatusCode  :  [null,[Validators.required, Validators.maxLength(20)]],
      employeeStatusName  :  [null,[Validators.required, Validators.maxLength(150)]]
    });
  }

  submitForm(){

    this._store$.dispatch( new Actions.SelectEmployeeStatus(this.employeeStatusForm.value) );
    this._store$.dispatch( new Actions.SaveEmployeeStatus(this.employeeStatusForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new Actions.ClearSelectEmployeeStatus() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
