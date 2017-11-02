import { Injectable } from '@angular/core';

import { MatDialog } from "@angular/material";

import { ConfirmDialogComponent } from "./confirm-dialog.component";

@Injectable()
export class ConfirmDialogService {

  constructor(private _dialog : MatDialog) { }

  openConfirm(title : string, message : string){
    let dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width : "auto",
      data  : { title, message }
    });

    return dialogRef;
  }

}
