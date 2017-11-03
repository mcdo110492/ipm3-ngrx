import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "./../../shared/shared.module";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EmployeeDetailsRoutingModule } from './employee-details-routing.module';
import { EmployeeDetailsComponent } from './employee-details.component';

import { EmployeeDetailsService } from "./employee-details.service";

import { EmployeePersonalInformationComponent, EmployeePersonalInformationService, EmployeePersonalInformationEffects } from "./employee-personal-information";

import { EmployeeEmploymentInformationComponent, EmployeeEmploymentInformationService, EmployeeEmploymentInformationEffects } from './employee-employment-information';

import { reducers } from "./reducers";



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeDetailsRoutingModule,
    StoreModule.forFeature('featureEmployeeDetails',reducers),

    EffectsModule.forFeature([  EmployeePersonalInformationEffects,
                                EmployeeEmploymentInformationEffects 
                             ])
  ],
  declarations: [ EmployeeDetailsComponent, 
                  EmployeePersonalInformationComponent, 
                  EmployeeEmploymentInformationComponent
                ],
  providers :[  EmployeeDetailsService,
                EmployeePersonalInformationService,
                EmployeeEmploymentInformationService
             ]
})
export class EmployeeDetailsModule { }
