import { Component, OnInit } from '@angular/core';

import { Store } from "@ngrx/store";

import { Observable } from 'rxjs/Observable';

import * as accountActions from "./actions/employee-account-settings.actions";
import * as fromRoot from "./../reducers";

@Component({
  selector: 'app-employee-account-settings',
  templateUrl: './employee-account-settings.component.html',
  styleUrls: ['./employee-account-settings.component.scss']
})
export class EmployeeAccountSettingsComponent implements OnInit {

  username$  : Observable<string>;
  status$    : Observable<number>;
  accountId$ : Observable<number>;  

  constructor(private _store$ : Store<fromRoot.State>) {

    this.username$  = this._store$.select(fromRoot.getAccountUsername);
    this.status$    = this._store$.select(fromRoot.getAccountStatus);
    this.accountId$ = this._store$.select(fromRoot.getAccountId);

  }

  ngOnInit() {
  }

  changeStatus(status : number){

    this._store$.dispatch( new accountActions.ChangeStatus(status) );

  }

  changeUsername(username : string){

    this._store$.dispatch( new accountActions.ChangeUsername(username) );

  }

  changePassword(isYes : boolean){

    this._store$.dispatch(new accountActions.ResetPassword(isYes));

  }

}
