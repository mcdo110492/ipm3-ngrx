import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as educational from './../actions/employee-educational.actions';

import { Observable } from 'rxjs/Observable';
import { take } from "rxjs/operators";

import { EmployeeEducational } from "./../models/employee-educational.model";

@Component({
  selector: 'app-employee-educational-form',
  templateUrl: './employee-educational-form.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeEducationalFormComponent implements OnInit {

  educationalForm : FormGroup;
  selectedEducational : Observable<EmployeeEducational>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmployeeEducationalFormComponent>, private _store$ : Store<fromRoot.State>) { 

    this.createForm();

    this.selectedEducational = this._store$.select(fromRoot.getSelectedEducational);

  }

  ngOnInit() {

    this.selectedEducational
    .pipe(
      take(1)
    )
    .subscribe((data : EmployeeEducational) => {
      if(data != null){
        this.educationalForm.patchValue(data);
      }
    });

  }


  createForm() {

    this.educationalForm = this._fb.group({
      employeeEducationId     : [0,Validators.required],
      schoolName              : [null,[Validators.required, Validators.maxLength(150)]],
      schoolAddress           : [null,[Validators.required, Validators.maxLength(150)]],
      schoolYear              : [null,[Validators.required, Validators.maxLength(50)]],
      degree                  : [null,[Validators.required, Validators.maxLength(150)]],
      major                   : [null,[Validators.required, Validators.maxLength(150)]],
      minor                   : [null,[Validators.required, Validators.maxLength(150)]],
      awards                  : [null,[Validators.required, Validators.maxLength(150)]]
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
