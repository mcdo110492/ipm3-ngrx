import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { StepperSelectionEvent } from "@angular/cdk/stepper";

import { Store } from "@ngrx/store";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as empActions from './actions/employee-details.actions';
import * as employmentActions from './employee-employment-information/actions/employee-employment.actions';
import * as fromRoot    from './reducers';

import { EmployeePersonal } from "./employee-personal-information/models/employee-personal.models";

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsComponent implements OnInit {

  personalInfo : Observable<EmployeePersonal>;

  constructor(private _store : Store<fromRoot.State>,
              private _route : ActivatedRoute ) { 
  
    this.personalInfo = this._store.select(fromRoot.getPersonal);

  }

  ngOnInit() {

    //this._store.dispatch( new empActions.GetEmployeeId(1));

    this._route.paramMap
    .switchMap((params : ParamMap) => { return Observable.of(+params.get('id')) })
    .take(1)
    .subscribe((id) => this._store.dispatch(new empActions.GetEmployeeId(id)) );

  }

  selectionChange(ev : StepperSelectionEvent){
    const index = ev.selectedIndex;

    if(index == 1){
      this._store.dispatch( new employmentActions.GetEmployment() ); // Get Employment Data
    }

  }


}
