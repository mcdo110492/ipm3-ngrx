import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDetailsComponent } from "./employee-details.component";

import { EmployeePersonalInformationComponent } from "./employee-personal-information/employee-personal-information.component";
import { EmployeeEmploymentInformationComponent } from "./employee-employment-information/employee-employment-information.component";
import { EmployeeContactInformationComponent } from "./employee-contact-information/employee-contact-information.component";
import { EmployeeGovernmentInformationComponent } from "./employee-government-information/employee-government-information.component";
import { EmployeeHealthInformationComponent } from "./employee-health-information/employee-health-information.component";
import { EmployeeLicensesComponent } from "./employee-licenses/employee-licenses.component";
import { EmployeeEducationalComponent } from "./employee-educational/employee-educational.component";
import { EmployeeTrainingInformationComponent } from "./employee-training-information/employee-training-information.component";
import { EmployeeClubInformationComponent } from "./employee-club-information/employee-club-information.component";

const routes: Routes = [
  { path: '', component: EmployeeDetailsComponent, data:{ animation : 'employee/details' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal' },
      { path: 'personal', component: EmployeePersonalInformationComponent, data:{ animation : 'employee/details/personal', label : 'personal' } },
      { path: 'employment', component: EmployeeEmploymentInformationComponent, data:{ animation : 'employee/details/employment', label : 'employment' } },
      { path: 'contact', component: EmployeeContactInformationComponent, data:{ animation : 'employee/details/contact', label : 'contact' } },
      { path: 'government', component: EmployeeGovernmentInformationComponent, data:{ animation : 'employee/details/government', label : 'government' } },
      { path: 'health', component: EmployeeHealthInformationComponent, data:{ animation : 'employee/details/health', label : 'health' } },
      { path: 'license', component: EmployeeLicensesComponent, data:{ animation : 'employee/details/license', label : 'license' } },
      { path: 'educational', component: EmployeeEducationalComponent, data:{ animation : 'employee/details/educational', label : 'educational' } },
      { path: 'training', component: EmployeeTrainingInformationComponent, data:{ animation : 'employee/details/training', label : 'training' } },
      { path: 'club', component: EmployeeClubInformationComponent, data:{ animation : 'employee/details/club', label : 'club' } },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsRoutingModule { }
