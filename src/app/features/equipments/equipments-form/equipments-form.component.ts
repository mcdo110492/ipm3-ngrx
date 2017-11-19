import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootEquipments from './../reducers';
import * as collectionSchedulesActions from './../actions/equipments.actions';

import * as masterDataActions from './../../../master-data/actions/master-data.actions';
import * as fromMasterData from './../../../master-data/reducers/master-data.reducers';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { Equipment } from "./../models/equipments.model";
import { Units } from '../../units/models/units.model';

@Component({
  selector: 'app-equipments-form',
  templateUrl: './equipments-form.component.html'
})
export class EquipmentsFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  equipmentsForm : FormGroup;
  selectedEquipments$ : Observable<Equipment>;
  units : Observable<Units[]>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EquipmentsFormComponent>, private _store$ : Store<fromRootEquipments.State>,private _masterStore : Store<fromMasterData.State>) {  

    this.createForm(); 

    this.selectedEquipments$ = this._store$.select(fromRootEquipments.getCollectionSelectedEquipment);
    this.units = this._masterStore.select(fromMasterData.getUnits);
  }


  ngOnInit() {
    
    this._masterStore.dispatch( new masterDataActions.GetAllUnits());

    this.subscription = this.selectedEquipments$.subscribe((response) => {
      if(response != null){

        this.equipmentsForm.setValue({
          equipmentId            : response.equipmentId,
          equipmentCode          : response.equipmentCode,
          bodyNumber             : response.bodyNumber,
          model                  : response.model,
          capacity               : response.capacity,
          plateNo                : response.plateNo,
          unitId                 : response.unitId,
          remarks                : response.remarks
        });

      }
    });

  }
  
  getCurrentId() {
    return this.equipmentsForm.get('equipmentId').value;
  }

  createForm() {
    this.equipmentsForm = this._fb.group({
      equipmentId             :  [0,Validators.required],
      equipmentCode           :  [null,[Validators.required,Validators.maxLength(20)]],
      bodyNumber              :  [null,[Validators.required,Validators.maxLength(20)]],
      model                   :  [null,[Validators.required,Validators.maxLength(150)]],
      capacity                :  [null,[Validators.required,Validators.maxLength(50)]],
      plateNo                 :  [null,[Validators.required,Validators.maxLength(50)]],
      unitId                  :  [null,Validators.required],
      remarks                 :  ['N/A',[Validators.required,Validators.maxLength(150)]]
    });
  }

  submitForm(){
    this._store$.dispatch( new collectionSchedulesActions.SaveEquipments(this.equipmentsForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new collectionSchedulesActions.ClearSelectEquipments() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
