import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootCollectionSchedules from './../reducers';
import * as collectionSchedulesActions from './../actions/collection-schedules.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { CollectionSchedules } from "./../models/collection-schedules.model";

@Component({
  selector: 'app-collection-schedules-form',
  templateUrl: './collection-schedules-form.component.html'
})
export class CollectionSchedulesFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  collectionSchedulesForm : FormGroup;
  selectedUnits$ : Observable<CollectionSchedules>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<CollectionSchedulesFormComponent>, private _store$ : Store<fromRootCollectionSchedules.State>) {  

    this.createForm(); 

    this.selectedUnits$ = this._store$.select(fromRootCollectionSchedules.getCollectionSelectedCollectionSchedule);

  }


  ngOnInit() {
    
    this.subscription = this.selectedUnits$.subscribe((response) => {
      if(response != null){

        this.collectionSchedulesForm.setValue({
          collectionScheduleId   : response.collectionScheduleId,
          collectionScheduleCode : response.collectionScheduleCode,
          collectionScheduleName : response.collectionScheduleName
        });

      }
    });

  }
  
  getCurrentId() {
    return this.collectionSchedulesForm.get('collectionScheduleId').value;
  }

  createForm() {
    this.collectionSchedulesForm = this._fb.group({
      collectionScheduleId    :  [0,Validators.required],
      collectionScheduleCode  :  [null,[Validators.required,Validators.maxLength(20)]],
      collectionScheduleName  :  [null,[Validators.required,Validators.maxLength(150)]]
    });
  }

  submitForm(){
    this._store$.dispatch( new collectionSchedulesActions.SaveCollectionSchedules(this.collectionSchedulesForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new collectionSchedulesActions.ClearSelectCollectionSchedules() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
