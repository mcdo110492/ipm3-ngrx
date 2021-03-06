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
import { EmployeeContactInformationComponent, EmployeeContactInformationService, EmployeeContactInformationEffects } from './employee-contact-information';
import { EmployeeGovernmentInformationComponent, EmployeeGovernmentInformationService, EmployeeGovernmentInformationEffects } from './employee-government-information';
import { EmployeeHealthInformationComponent, EmployeeHealthInformationService, EmployeeHealthInformationEffects } from './employee-health-information';
import { EmployeeLicensesComponent, EmployeeLicensesTableComponent, EmployeeLicensesFormComponent, EmployeeLicensesService, EmployeeLicensesEffects } from './employee-licenses';
import { EmployeeEducationalComponent, EmployeeEducationalService, EmployeeEducationalFormComponent, EmployeeEducationalTableComponent, EmployeeEducationalEffects } from './employee-educational';
import { EmployeeTrainingInformationComponent, EmployeeTrainingFormComponent, EmployeeTrainingTableComponent, EmployeeTrainingInformationService, EmployeeTrainingInformationEffects } from './employee-training-information';
import { EmployeeClubInformationComponent, EmployeeClubFormComponent, EmployeeClubInformationEffects, EmployeeClubInformationService, EmployeeClubTableComponent } from './employee-club-information';
import { EmployeeAccountSettingsComponent, EmployeeAccountChangePasswordComponent, EmployeeAccountChangeStatusComponent, EmployeeAccountChangeUsernameComponent, EmployeeAccountSettingsService } from './employee-account-settings';

import { reducers } from "./reducers";


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EmployeeDetailsRoutingModule,
    StoreModule.forFeature('featureEmployeeDetails',reducers),

    EffectsModule.forFeature([  EmployeePersonalInformationEffects,
                                EmployeeEmploymentInformationEffects,
                                EmployeeContactInformationEffects,
                                EmployeeGovernmentInformationEffects,
                                EmployeeHealthInformationEffects,
                                EmployeeLicensesEffects,
                                EmployeeEducationalEffects,
                                EmployeeTrainingInformationEffects,
                                EmployeeClubInformationEffects
                             ])
  ],
  declarations: [ EmployeeDetailsComponent, 
                  EmployeePersonalInformationComponent, 
                  EmployeeEmploymentInformationComponent, 
                  EmployeeContactInformationComponent, 
                  EmployeeGovernmentInformationComponent, 
                  EmployeeHealthInformationComponent, 
                  EmployeeLicensesComponent, 
                  EmployeeLicensesTableComponent, 
                  EmployeeLicensesFormComponent, 
                  EmployeeEducationalComponent, 
                  EmployeeEducationalTableComponent, 
                  EmployeeEducationalFormComponent, 
                  EmployeeTrainingInformationComponent, 
                  EmployeeTrainingTableComponent, 
                  EmployeeTrainingFormComponent, 
                  EmployeeClubInformationComponent, 
                  EmployeeClubTableComponent, 
                  EmployeeClubFormComponent, 
                  EmployeeAccountSettingsComponent, 
                  EmployeeAccountChangePasswordComponent, 
                  EmployeeAccountChangeUsernameComponent, 
                  EmployeeAccountChangeStatusComponent
                ],
  entryComponents : [
                  EmployeeLicensesFormComponent,
                  EmployeeEducationalFormComponent,
                  EmployeeTrainingFormComponent,
                  EmployeeClubFormComponent
  ],
  providers :[  EmployeeDetailsService,
                EmployeePersonalInformationService,
                EmployeeEmploymentInformationService,
                EmployeeContactInformationService,
                EmployeeGovernmentInformationService,
                EmployeeHealthInformationService,
                EmployeeLicensesService,
                EmployeeEducationalService,
                EmployeeTrainingInformationService,
                EmployeeClubInformationService,
                EmployeeAccountSettingsService
             ]
})
export class EmployeeDetailsModule { }
