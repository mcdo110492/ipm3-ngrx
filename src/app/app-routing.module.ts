import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from "./core/services/authentication.guard";

import { LoginComponent } from "./features/login/login.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path :'login', component :  LoginComponent, data : { animation: 'login' }},
  { path: 'projects', loadChildren: 'app/features/projects/projects.module#ProjectsModule', data : { animation : 'projects' }, canActivate: [AuthenticationGuard] },
  { path: 'positions', loadChildren: 'app/features/positions/positions.module#PositionsModule', data : { animation : 'positions' }, canActivate :[AuthenticationGuard] },
  { path: 'employment/status', loadChildren: 'app/features/employment-status/employment-status.module#EmploymentStatusModule', data : { animation : 'employmentStatus' } },
  { path: 'employee/status', loadChildren: 'app/features/employee-status/employee-status.module#EmployeeStatusModule', data : { animation : 'employeeStatus' } },
  { path: 'employee/register', loadChildren: 'app/features/employee-register/employee-register.module#EmployeeRegisterModule', data : { animation : 'employee' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
