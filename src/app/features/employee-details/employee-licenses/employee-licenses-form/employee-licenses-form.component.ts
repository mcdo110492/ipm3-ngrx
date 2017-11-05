import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { MatDialogRef } from "@angular/material";

import { Store } from "@ngrx/store";
import * as fromRoot from './../../reducers';
import * as licenseAction from './../actions/employee-license.actions';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { EmployeeLicense } from "./../models/employee-licenses.models";

@Component({
  selector: 'app-employee-licenses-form',
  templateUrl: './employee-licenses-form.component.html'
})
export class EmployeeLicensesFormComponent implements OnInit {

  licenseForm : FormGroup;
  selectedLicense : Observable<EmployeeLicense>;

  constructor(private _fb : FormBuilder, private _dialogRef : MatDialogRef<EmployeeLicensesFormComponent>, private _store$ : Store<fromRoot.State>) { 

    this.createForm();

    this.selectedLicense = this._store$.select(fromRoot.getSelectedLicense);

  }

  ngOnInit() {

    this.selectedLicense.take(1)
    .subscribe((data : EmployeeLicense) => {
      if(data != null){
        this.licenseForm.patchValue(data);
      }
    });

  }

  get currentId () { return this.licenseForm.get('employeeLicenseId').value }; 

  createForm() {

    this.licenseForm = this._fb.group({
        employeeLicenseId     : [0,Validators.required],
        licenseNumber         : [null,Validators.required],
        licenseType           : [null,Validators.required],
        dateIssued            : [null,Validators.required],
        dateExpiry            : [null,Validators.required]
    });

  }

  saveForm(){
    this._store$.dispatch( new licenseAction.SaveLicense(this.licenseForm.value) );
    this._dialogRef.close();
  }

  closeDialog(){
    this._store$.dispatch( new licenseAction.ClearSelected() );
    this._dialogRef.close();
  }

}
