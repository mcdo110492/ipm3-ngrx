import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import * as governmentActions from "./actions/employee-government.actions";
import * as fromRoot from "./../reducers";

import { Observable } from 'rxjs/Observable';
import { take } from "rxjs/operators";

import { EmployeeGovernment } from "./models/employee-government.model";

@Component({
  selector: 'app-employee-government-information',
  templateUrl: './employee-government-information.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeGovernmentInformationComponent implements OnInit {

  governmentForm      : FormGroup;
  governmentData      : Observable<EmployeeGovernment>;

  constructor(private _fb : FormBuilder,
              private _store : Store<fromRoot.State>) { 

    this.createForm();

    this.governmentData = this._store.select(fromRoot.getGovernment);

  }

  ngOnInit() {

    this._store.dispatch( new governmentActions.GetGovernment() );
   
    this.governmentData
    .pipe(
      take(2)
    )
    .subscribe((data : EmployeeGovernment) => {
      if(data !== undefined){
        this.governmentForm.patchValue(data)
      }
      
    });

  }

  createForm() : void {

    this.governmentForm = this._fb.group({
      employeeGovernmentId     : [null,Validators.required],
      sssNumber                : [null,Validators.required],
      pagIbigNumber            : [null,Validators.required],
      philHealthNumber         : [null,Validators.required],
      tinNumber                : [null,Validators.required]
    });

  }

  save(){
    this._store.dispatch( new governmentActions.SaveGovernment(this.governmentForm.value) );
  }

}
