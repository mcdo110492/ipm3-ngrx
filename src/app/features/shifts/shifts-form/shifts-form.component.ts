import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootShifts from './../reducers';
import * as shiftsActions from './../actions/shifts.actions';

import * as masterDataActions from './../../../master-data/actions/master-data.actions';
import * as fromMasterData from './../../../master-data/reducers/master-data.reducers';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { Equipment } from "./../../equipments/models/equipments.model";
import { CollectionSchedules } from "./../../collection-schedules/models/collection-schedules.model";
import { CollectionTypes } from "./../../collection-types/models/collection-types.model";
import { Shifts } from '../models/shifts.model';

@Component({
  selector: 'app-shifts-form',
  templateUrl: './shifts-form.component.html',
  styleUrls: ['./shifts-form.component.scss']
})
export class ShiftsFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  shiftsForm : FormGroup;
  selectedShifts$ : Observable<Shifts>;
  equipments$ : Observable<Equipment[]>;
  collectionSchedules$ : Observable<CollectionSchedules[]>;
  collectionTypes$    : Observable<CollectionTypes[]>;
  currentDate : Date = new Date();

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<ShiftsFormComponent>, private _store$ : Store<fromRootShifts.State>,private _masterStore : Store<fromMasterData.State>) {  

    this.createForm(); 

    this.selectedShifts$      = this._store$.select(fromRootShifts.getCollectionSelectedShift);
    this.equipments$          = this._masterStore.select(fromMasterData.getEquipments);
    this.collectionSchedules$ = this._masterStore.select(fromMasterData.getCollectionSchedules);
    this.collectionTypes$     = this._masterStore.select(fromMasterData.getCollectionTypes);
  }


  ngOnInit() {
    
    this._masterStore.dispatch( new masterDataActions.GetAllEquipments());
    this._masterStore.dispatch( new masterDataActions.GetAllCollectionSchedule() );
    this._masterStore.dispatch( new masterDataActions.GetAllCollectionType() );

    this.subscription = this.selectedShifts$.subscribe((response) => {
      if(response != null){

        const time = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth()}-${this.currentDate.getDate()} ${response.shiftTime}`;


        this.shiftsForm.setValue({
          shiftId                 :  response.shiftId,
          equipmentId             :  response.equipmentId,
          collectionScheduleId    :  response.collectionScheduleId,
          collectionTypeId        :  response.collectionTypeId,
          geofenceName            :  response.geofenceName,
          sectors                 :  response.sectors,
          shiftTime               :  new Date(time)
        });
      }
    });

  }
  


  createForm() {
    this.shiftsForm = this._fb.group({
      shiftId                 :  [0,Validators.required],
      equipmentId             :  [null,Validators.required],
      collectionScheduleId    :  [null,Validators.required],
      collectionTypeId        :  [null,Validators.required],
      geofenceName            :  [null,[Validators.required,Validators.maxLength(150)]],
      sectors                 :  [null,[Validators.required,Validators.maxLength(150)]],
      shiftTime               :  [null,Validators.required]
    });
  }

  submitForm(){
    this._store$.dispatch( new shiftsActions.SaveShifts(this.shiftsForm.value) );
    this._dialogRef.close();
    
  }


  closeDialog(){
    this._store$.dispatch( new shiftsActions.ClearSelectShifts() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
