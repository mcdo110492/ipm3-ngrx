import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "./../../shared/shared.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EmployeeListRoutingModule } from './employee-list-routing.module';
import { EmployeeListComponent } from './employee-list.component';

import { EmployeeListService } from "./employee-list.service";
import { EmployeeListTableComponent } from './employee-list-table/employee-list-table.component';

import { reducers } from "./reducers";
import { EmploymentListEffects } from "./effects/employee-list.effects";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeListRoutingModule,
    StoreModule.forFeature('featureEmployeeList',reducers),
    EffectsModule.forFeature([EmploymentListEffects])
  ],
  declarations: [EmployeeListComponent, EmployeeListTableComponent],
  providers:[EmployeeListService]
})
export class EmployeeListModule { }
