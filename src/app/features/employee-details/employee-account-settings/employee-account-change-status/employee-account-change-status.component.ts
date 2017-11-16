import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { ConfirmDialogService } from "./../../../../main-content/services/confirm-dialog/confirm-dialog.service";

@Component({
  selector: 'app-employee-account-change-status',
  templateUrl: './employee-account-change-status.component.html',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmployeeAccountChangeStatusComponent{

  @Input() status : number;
  @Output() changeStatus : EventEmitter<number> = new EventEmitter<number>();

  constructor(private _confirmService : ConfirmDialogService) { }

  ngOnInit() {
  }

  change(status : number){

    let statusType = (status == 0) ? 'locked' : 'activate';

    this._confirmService.openConfirm('Are you sure?',`Do you want to ${statusType} this account`)
    .afterClosed()
    .subscribe((response) => {
        if(response){
          this.changeStatus.emit(status);
        }
    });
    

  }

}
