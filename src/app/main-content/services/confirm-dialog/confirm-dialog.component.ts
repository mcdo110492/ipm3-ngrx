import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from "@angular/material";

import { ConfirmDialog } from "./confirm-dialog.model";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent{

  constructor(@Inject(MAT_DIALOG_DATA) public data : ConfirmDialog){}

}
