import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootPosition from './../reducers';
import * as positionActions from './../actions/position.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { Position } from "./../models/positions.model";

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html'
})
export class PositionsFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  positionForm : FormGroup;
  selectedPosition$ : Observable<Position>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<PositionsFormComponent>, private _store$ : Store<fromRootPosition.State>) {  

    this.createForm(); 

    this.selectedPosition$ = this._store$.select(fromRootPosition.getSelectedPosition);

  }


  ngOnInit() {
    
    this.subscription = this.selectedPosition$.subscribe((response) => {
      if(response != null){

        this.positionForm.setValue({
          positionId   : response.positionId,
          positionName : response.positionName
        });

      }
    });

  }
  

  getCurrentId() {
    return this.positionForm.get('positionId').value
  }


  createForm() {
    this.positionForm = this._fb.group({
        positionId    :  [0,Validators.required],
        positionName  :  [null,Validators.required]
    });
  }

  submitForm(){

    this._store$.dispatch( new positionActions.SelectPosition(this.positionForm.value) );
    this._store$.dispatch( new positionActions.SavePosition(this.positionForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new positionActions.ClearSelectPosition() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
