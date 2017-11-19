import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRootCollectionTypes from './../reducers';
import * as collectionTypesActions from './../actions/collection-types.actions';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { CollectionTypes } from "./../models/collection-types.model";


@Component({
  selector: 'app-collection-types-form',
  templateUrl: './collection-types-form.component.html'
})
export class CollectionTypesFormComponent implements OnInit, OnDestroy {

  subscription : Subscription;
  collectionTypesForm : FormGroup;
  selectedUnits$ : Observable<CollectionTypes>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<CollectionTypesFormComponent>, private _store$ : Store<fromRootCollectionTypes.State>) {  

    this.createForm(); 

    this.selectedUnits$ = this._store$.select(fromRootCollectionTypes.getCollectionSelectedCollectionType);

  }


  ngOnInit() {
    
    this.subscription = this.selectedUnits$.subscribe((response) => {
      if(response != null){

        this.collectionTypesForm.setValue({
          collectionTypeId   : response.collectionTypeId,
          collectionTypeCode : response.collectionTypeCode,
          collectionTypeName : response.collectionTypeName
        });

      }
    });

  }
  
  getCurrentId() {
    return this.collectionTypesForm.get('collectionTypeId').value;
  }

  createForm() {
    this.collectionTypesForm = this._fb.group({
      collectionTypeId    :  [0,Validators.required],
      collectionTypeCode  :  [null,[Validators.required,Validators.maxLength(20)]],
      collectionTypeName  :  [null,[Validators.required,Validators.maxLength(150)]]
    });
  }

  submitForm(){
    this._store$.dispatch( new collectionTypesActions.SaveCollectionTypes(this.collectionTypesForm.value) );
    this._dialogRef.close();
    
  }

  closeDialog(){
    this._store$.dispatch( new collectionTypesActions.ClearSelectCollectionTypes() );
    this._dialogRef.close();

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
