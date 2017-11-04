import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import * as personalActions from "./actions/employee-personal.actions";
import * as fromRoot from "./../reducers";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { EmployeePersonal } from "./models/employee-personal.models";

@Component({
  selector: 'app-employee-personal-information',
  templateUrl: './employee-personal-information.component.html',
  styleUrls: ['./employee-personal-information.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeePersonalInformationComponent implements OnInit {

  personalForm      : FormGroup;
  civilStatuses     : string[] = ['Single','Married','Divorced','Widowed'];
  personalData      : Observable<EmployeePersonal>;
  currentId         : number = 0;

  constructor(private _fb : FormBuilder,
              private _store : Store<fromRoot.State>) { 

    this.createForm();

    this.personalData = this._store.select(fromRoot.getPersonal);

  }

  ngOnInit() {

    
   
    this.personalData
    .take(2)
    .subscribe((data : EmployeePersonal) => {
      if(data !== undefined){
        this.personalForm.patchValue(data)
        this.currentId = data.employeeId;
      }
      
    });

  }

  createForm() : void {

    this.personalForm = this._fb.group({
      employeeId        : [null,Validators.required],
      employeeNumber    : [null,Validators.required],
      firstName         : [null,Validators.required],
      middleName        : [null,Validators.required],
      lastName          : [null,Validators.required],
      birthday          : [null,Validators.required],
      placeOfBirth      : [null,Validators.required],
      civilStatus       : [null,Validators.required],
      citizenship       : [null,Validators.required],
      religion          : [null,Validators.required]
    });

  }

  save(){
    this._store.dispatch( new personalActions.SavePersonal(this.personalForm.value) );
  }

}
