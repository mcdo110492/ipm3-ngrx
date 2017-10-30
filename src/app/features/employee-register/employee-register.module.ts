import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "./../../shared/shared.module";

import { EmployeeRegisterRoutingModule } from './employee-register-routing.module';
import { EmployeeRegisterComponent } from './employee-register.component';

import { EmployeeRegisterService } from "./employee-register.service";
import { EmployeeRegisterFormComponent } from './employee-register-form/employee-register-form.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeRegisterRoutingModule
  ],
  declarations: [EmployeeRegisterComponent, EmployeeRegisterFormComponent],
  providers:[EmployeeRegisterService]
})
export class EmployeeRegisterModule { }
