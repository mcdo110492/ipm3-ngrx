import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as clubAction from './../actions/employee-club.actions';

import { Observable } from 'rxjs/Observable';
import { take } from "rxjs/operators";

import { EmployeeClub } from "./../models/employee-club.model";

@Component({
  selector: 'app-employee-club-form',
  templateUrl: './employee-club-form.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeClubFormComponent implements OnInit {

  clubForm : FormGroup;
  selectedClub : Observable<EmployeeClub>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmployeeClubFormComponent>, private _store$ : Store<fromRoot.State>) { 

    this.createForm();

    this.selectedClub = this._store$.select(fromRoot.getSelectedClub);

  }

  ngOnInit() {

    this.selectedClub
    .pipe(
      take(1)
    )
    .subscribe((data : EmployeeClub) => {
      if(data != null){
        this.clubForm.patchValue(data);
      }
    });

  }


  createForm() {

    this.clubForm = this._fb.group({
      employeeClubId         : [0,Validators.required],
      clubName               : [null,Validators.required],
      clubPosition           : [null,Validators.required],
      membershipDate         : [null,Validators.required]
    });

  }

  saveForm(){
    this._store$.dispatch( new clubAction.SaveClub(this.clubForm.value) );
    this._dialogRef.close();
  }

  closeDialog(){
    this._store$.dispatch( new clubAction.ClearSelected() );
    this._dialogRef.close();
  }

}
