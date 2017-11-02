import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "./../../shared/shared.module";

import { EmployeeRegisterRoutingModule } from './employee-register-routing.module';
import { EmployeeRegisterComponent } from './employee-register.component';

import { EmployeeRegisterService } from "./employee-register.service";
import { EmployeeRegisterFormComponent } from './employee-register-form/employee-register-form.component';

import { reducers } from "./reducers";
import { EmployeeRegisterEffects } from "./effects/employee-register.effects";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRegisterRoutingModule,
    StoreModule.forFeature('featureEmployeeRegister',reducers),
    EffectsModule.forFeature([EmployeeRegisterEffects])
  ],
  declarations: [EmployeeRegisterComponent, EmployeeRegisterFormComponent],
  providers:[EmployeeRegisterService]
})
export class EmployeeRegisterModule { }
