import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ConfirmDialogService } from "./../../../../main-content/services/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'app-employee-account-change-password',
  templateUrl: './employee-account-change-password.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeAccountChangePasswordComponent{

  @Output() changePassword : EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private _confirmService : ConfirmDialogService){}

  submit() {
    this._confirmService.openConfirm('Are you sure?','Do you want to reset this account password. The default password will be the current username.')
    .afterClosed()
    .subscribe((response) => {
        if(response){
          this.changePassword.emit(true);
        }
        else{
          this.changePassword.emit(false);
        }
    });
    
  }

}
