import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from "@ngrx/store";

import { ConfirmDialogService } from "./../../main-content/services/confirm-dialog/confirm-dialog.service";


import * as empActions from "./actions/employee-register.actions";
import * as fromRoot from './reducers';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeRegisterComponent {

  constructor(
    private _confirmServie : ConfirmDialogService,
    private _store : Store<fromRoot.State>
  ){}

  submit(){

    let confirm = this._confirmServie.openConfirm('Would you like to proceed?','Click Yes if you want to submit the form.');

    confirm.afterClosed().subscribe((response) => {
      if(response){
        this._store.dispatch( new empActions.Submit() );
      }
    });
  }

}
