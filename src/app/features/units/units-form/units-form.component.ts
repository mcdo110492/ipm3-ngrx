import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootUnits from './../reducers';
import * as unitsActions from './../actions/units.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { Units } from "./../models/units.model";

@Component({
  selector: 'app-units-form',
  templateUrl: './units-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UnitsFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  unitsForm : FormGroup;
  selectedUnits$ : Observable<Units>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<UnitsFormComponent>, private _store$ : Store<fromRootUnits.State>) {  

    this.createForm(); 

    this.selectedUnits$ = this._store$.select(fromRootUnits.getCollectionSelectedUnits);

  }


  ngOnInit() {
    
    this.subscription = this.selectedUnits$.subscribe((response) => {
      if(response != null){

        this.unitsForm.setValue({
          unitId   : response.unitId,
          unitCode : response.unitCode,
          unitName : response.unitName
        });

      }
    });

  }
  
  getCurrentId() {
    return this.unitsForm.get('unitId').value;
  }

  createForm() {
    this.unitsForm = this._fb.group({
        unitId    :  [0,Validators.required],
        unitCode  :  [null,[Validators.required,Validators.maxLength(20)]],
        unitName  :  [null,[Validators.required,Validators.maxLength(150)]]
    });
  }

  submitForm(){
    this._store$.dispatch( new unitsActions.SaveUnits(this.unitsForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new unitsActions.ClearSelectUnits() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
