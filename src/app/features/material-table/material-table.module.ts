import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "./../../shared/shared.module";

import { MaterialTableRoutingModule } from './material-table-routing.module';
import { MaterialTableComponent } from './material-table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialTableRoutingModule
  ],
  declarations: [MaterialTableComponent]
})
export class MaterialTableModule { }
