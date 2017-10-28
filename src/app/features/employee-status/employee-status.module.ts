import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "./../../shared/shared.module";

import { EmployeeStatusRoutingModule } from './employee-status-routing.module';
import { EmployeeStatusComponent } from './employee-status.component';
import { EmployeeStatusTableComponent } from './employee-status-table/employee-status-table.component';
import { EmployeeStatusFormComponent } from './employee-status-form/employee-status-form.component';

import { EmployeeStatusService } from "./employee-status.service";

import { reducers } from "./reducers";
import { EmploymentStatusEffects } from "./effects/employee-status.effects";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeStatusRoutingModule,
    StoreModule.forFeature('featureEmployeeStatus',reducers),
    EffectsModule.forFeature([EmploymentStatusEffects])
  ],
  declarations: [EmployeeStatusComponent, EmployeeStatusTableComponent, EmployeeStatusFormComponent],
  entryComponents: [EmployeeStatusFormComponent],
  providers:[EmployeeStatusService]
})
export class EmployeeStatusModule { }
