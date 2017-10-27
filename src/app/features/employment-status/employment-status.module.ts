import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "./../../shared/shared.module";

import { EmploymentStatusRoutingModule } from './employment-status-routing.module';
import { EmploymentStatusComponent } from './employment-status.component';
import { EmploymentStatusTableComponent } from './employment-status-table/employment-status-table.component';
import { EmploymentStatusFormComponent } from './employment-status-form/employment-status-form.component';

import { EmploymentStatusService } from "./employment-status.service";

import { reducers } from "./reducers";
import { EmploymentStatusEffects } from "./effects/employment-status.effects";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmploymentStatusRoutingModule,
    StoreModule.forFeature('featureEmploymentStatus',reducers),
    EffectsModule.forFeature([EmploymentStatusEffects])
  ],
  declarations: [EmploymentStatusComponent, EmploymentStatusTableComponent, EmploymentStatusFormComponent],
  entryComponents:[EmploymentStatusFormComponent],
  providers:[EmploymentStatusService]
})
export class EmploymentStatusModule { }
