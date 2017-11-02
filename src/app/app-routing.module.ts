import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from "./core/services/authentication.guard";

import { LoginComponent } from "./features/login/login.component";
import { PageNotFoundComponent } from "./main-content/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path :'login', component :  LoginComponent, data : { animation: 'login' }},
  { path: 'projects', loadChildren: 'app/features/projects/projects.module#ProjectsModule', data : { animation : 'projects' }, canActivate: [AuthenticationGuard] },
  { path: 'positions', loadChildren: 'app/features/positions/positions.module#PositionsModule', data : { animation : 'positions' }, canActivate :[AuthenticationGuard] },
  { path: 'employment/status', loadChildren: 'app/features/employment-status/employment-status.module#EmploymentStatusModule', data : { animation : 'employmentStatus' },canActivate :[AuthenticationGuard] },
  { path: 'employee/status', loadChildren: 'app/features/employee-status/employee-status.module#EmployeeStatusModule', data : { animation : 'employeeStatus' },canActivate :[AuthenticationGuard] },
  { path: 'employee/register', loadChildren: 'app/features/employee-register/employee-register.module#EmployeeRegisterModule', data : { animation : 'employee' },canActivate :[AuthenticationGuard] },
  { path: 'employee/list', loadChildren: 'app/features/employee-list/employee-list.module#EmployeeListModule', data : { animation : 'employee/list' },canActivate :[AuthenticationGuard] },
  { path: 'employee/details/:empNum/:id', loadChildren: 'app/features/employee-details/employee-details.module#EmployeeDetailsModule', data : { animation : 'employee/detail' },canActivate :[AuthenticationGuard] },
  {path : '404/page-not-found', component : PageNotFoundComponent, data: { animation : 'page-not-found' } },
  { path: '**', pathMatch: 'full', redirectTo : '404/page-not-found'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
