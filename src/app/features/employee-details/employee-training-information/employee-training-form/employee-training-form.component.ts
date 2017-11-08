import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as trainingAction from './../actions/employee-training.actions';

import { Observable } from 'rxjs/Observable';
import { take } from "rxjs/operators";

import { EmployeeTraining } from "./../models/employee-training.model";


@Component({
  selector: 'app-employee-training-form',
  templateUrl: './employee-training-form.component.html'
})
export class EmployeeTrainingFormComponent implements OnInit {

  trainingForm : FormGroup;
  selectedTraining : Observable<EmployeeTraining>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmployeeTrainingFormComponent>, private _store$ : Store<fromRoot.State>) { 

    this.createForm();

    this.selectedTraining = this._store$.select(fromRoot.getSelectedTraining);

  }

  ngOnInit() {

    this.selectedTraining
    .pipe(
      take(1)
    )
    .subscribe((data : EmployeeTraining) => {
      if(data != null){
        this.trainingForm.patchValue(data);
      }
    });

  }


  createForm() {

    this.trainingForm = this._fb.group({
      employeeTrainingId      : [0,Validators.required],
      trainingName            : [null,Validators.required],
      trainingTitle           : [null,Validators.required],
      trainingFrom            : [null,Validators.required],
      trainingTo              : [null,Validators.required]
    });

  }

  saveForm(){
    this._store$.dispatch( new trainingAction.SaveTraining(this.trainingForm.value) );
    this._dialogRef.close();
  }

  closeDialog(){
    this._store$.dispatch( new trainingAction.ClearSelected() );
    this._dialogRef.close();
  }

}
