import { Injectable } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from "@angular/material";

import { LoaderSpinnerComponent } from "./loader-spinner.component";

@Injectable()
export class LoaderSpinnerService {

  dialogRef;

  constructor(private _dialog : MatDialog) { }

  openDialog() {
    return this.dialogRef = this._dialog.open(LoaderSpinnerComponent, { 
      id: 'loader-spinner' ,
      disableClose: true,
      height : '70px',
      width  : '70px' 
    });
    
  }

  closeDialog() : void {

    this.dialogRef.close();

  }

}
