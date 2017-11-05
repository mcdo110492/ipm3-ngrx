import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as educational from './../actions/employee-educational.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { EmployeeEducational } from "./../models/employee-educational.model";

@Component({
  selector: 'app-employee-educational-form',
  templateUrl: './employee-educational-form.component.html'
})
export class EmployeeEducationalFormComponent implements OnInit {

  educationalForm : FormGroup;
  selectedEducational : Observable<EmployeeEducational>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmployeeEducationalFormComponent>, private _store$ : Store<fromRoot.State>) { 

    this.createForm();

    this.selectedEducational = this._store$.select(fromRoot.getSelectedEducational);

  }

  ngOnInit() {

    this.selectedEducational.take(1)
    .subscribe((data : EmployeeEducational) => {
      if(data != null){
        this.educationalForm.patchValue(data);
      }
    });

  }


  createForm() {

    this.educationalForm = this._fb.group({
      employeeEducationId     : [0,Validators.required],
      schoolName              : [null,Validators.required],
      schoolAddress           : [null,Validators.required],
      schoolYear              : [null,Validators.required],
      degree                  : [null,Validators.required],
      major                   : [null,Validators.required],
      minor                   : [null,Validators.required],
      awards                  : [null,Validators.required]
    });

  }

  saveForm(){
    this._store$.dispatch( new educational.SaveEducational(this.educationalForm.value) );
    this._dialogRef.close();
  }

  closeDialog(){
    this._store$.dispatch( new educational.ClearSelected() );
    this._dialogRef.close();
  }

}
