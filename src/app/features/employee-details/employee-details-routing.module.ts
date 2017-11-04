import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDetailsComponent } from "./employee-details.component";

import { EmployeePersonalInformationComponent } from "./employee-personal-information/employee-personal-information.component";
import { EmployeeEmploymentInformationComponent } from "./employee-employment-information/employee-employment-information.component";
import { EmployeeContactInformationComponent } from "./employee-contact-information/employee-contact-information.component";
import { EmployeeGovernmentInformationComponent } from "./employee-government-information/employee-government-information.component";
import { EmployeeHealthInformationComponent } from "./employee-health-information/employee-health-information.component";

const routes: Routes = [
  { path: '', component: EmployeeDetailsComponent, data:{ animation : 'employee/details' },
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'personal' },
      { path: 'personal', component: EmployeePersonalInformationComponent, data:{ animation : 'employee/details/personal', label : 'personal' } },
      { path: 'employment', component: EmployeeEmploymentInformationComponent, data:{ animation : 'employee/details/employment', label : 'employment' } },
      { path: 'contact', component: EmployeeContactInformationComponent, data:{ animation : 'employee/details/contact', label : 'contact' } },
      { path: 'government', component: EmployeeGovernmentInformationComponent, data:{ animation : 'employee/details/government', label : 'government' } },
      { path: 'health', component: EmployeeHealthInformationComponent, data:{ animation : 'employee/details/health', label : 'health' } },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsRoutingModule { }
