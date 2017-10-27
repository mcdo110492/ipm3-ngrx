import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../reducers';
import * as Actions from './../actions/employment-status.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { EmploymentStatus } from "./../models/employment-status.model";

@Component({
  selector: 'app-employment-status-form',
  templateUrl: './employment-status-form.component.html'
})
export class EmploymentStatusFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  employmentStatusForm : FormGroup;
  selectedEmploymentStatus$ : Observable<EmploymentStatus>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmploymentStatusFormComponent>, private _store$ : Store<fromRoot.State>) {  

    this.createForm(); 

    this.selectedEmploymentStatus$ = this._store$.select(fromRoot.getSelectedEmploymentStatus);

  }


  ngOnInit() {
    
    this.subscription = this.selectedEmploymentStatus$.subscribe((response) => {
      if(response != null){

        this.employmentStatusForm.setValue({
          employmentStatusId           : response.employmentStatusId,
          employmentStatusName         : response.employmentStatusName
        });

      }
    });

  }
  
  get currentId() { return this.employmentStatusForm.get('employmentStatusId').value };


  createForm() {
    this.employmentStatusForm = this._fb.group({
      employmentStatusId    :  [0,Validators.required],
      employmentStatusName  :  [null,Validators.required]
    });
  }

  submitForm(){

    this._store$.dispatch( new Actions.SelectEmploymentStatus(this.employmentStatusForm.value) );
    this._store$.dispatch( new Actions.SaveEmploymentStatus(this.employmentStatusForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new Actions.ClearSelectEmploymentStatus() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
