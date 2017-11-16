import { Injectable } from '@angular/core';

import { MatDialog } from "@angular/material";

import { LoaderSpinnerComponent } from "./loader-spinner.component";

@Injectable()
export class LoaderSpinnerService {

  dialogRef ;

  constructor(private _dialog : MatDialog) { }

  openDialog() {

    return  this.dialogRef = this._dialog.open(LoaderSpinnerComponent, { 
      id: 'loader-spinner' ,
      disableClose: true,
      height : 'auto',
      width  : 'auto' 
    });
    
  }

  closeDialog() : void {

    this.dialogRef.close();

  }

}
