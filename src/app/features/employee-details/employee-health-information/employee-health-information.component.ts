import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import * as healthActions from "./actions/employee-health.actions";
import * as fromRoot from "./../reducers";

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/toArray';

import { EmployeeHealth } from "./models/employee-health.model";

@Component({
  selector: 'app-employee-health-information',
  templateUrl: './employee-health-information.component.html',
  styleUrls: ['./employee-health-information.component.scss']
})
export class EmployeeHealthInformationComponent implements OnInit {

  healthForm      : FormGroup;
  healthData      : Observable<EmployeeHealth>;

  constructor(private _fb : FormBuilder,
              private _store : Store<fromRoot.State>) { 

    this.createForm();

    this.healthData = this._store.select(fromRoot.getHealth);

  }

  ngOnInit() {

    this._store.dispatch( new healthActions.GetHealth() );
   
    this.healthData
    .take(2)
    .subscribe((data : EmployeeHealth) => {
      if(data !== undefined){
        this.healthForm.patchValue(data)
      }
      
    });

  }

  createForm() : void {

    this.healthForm = this._fb.group({
      employeeHealthId     : [null,Validators.required],
      height               : [null,Validators.required],
      weight               : [null,Validators.required],
      bloodType            : [null,Validators.required]
    });

  }

  save(){
    this._store.dispatch( new healthActions.SaveHealth(this.healthForm.value) );
  }

}
