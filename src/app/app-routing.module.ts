import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./features/login/login.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path :'login', component :  LoginComponent, data : { animation: 'login' }},
  { path: 'projects', loadChildren: 'app/features/projects/projects.module#ProjectsModule', data : { animation : 'projects' } },
  { path: 'positions', loadChildren: 'app/features/positions/positions.module#PositionsModule', data : { animation : 'positions' } },
  { path: 'employment/status', loadChildren: 'app/features/employment-status/employment-status.module#EmploymentStatusModule', data : { animation : 'employmentStatus' } },
  { path: 'employee/status', loadChildren: 'app/features/employee-status/employee-status.module#EmployeeStatusModule', data : { animation : 'employeeStatus' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
