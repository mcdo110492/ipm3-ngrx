import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationGuard } from "./core/services/authentication.guard";

import { LoginComponent } from "./features/login/login.component";
import { PageNotFoundComponent } from "./main-content/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path :'login', component :  LoginComponent, data : { animation: 'login' }},
  
  { path: 'projects', loadChildren: 'app/features/projects/projects.module#ProjectsModule', data : { animation : 'projects' }, canLoad: [AuthenticationGuard] },
  { path: 'positions', loadChildren: 'app/features/positions/positions.module#PositionsModule', data : { animation : 'positions' }, canLoad :[AuthenticationGuard] },
  { path: 'employment/status', loadChildren: 'app/features/employment-status/employment-status.module#EmploymentStatusModule', data : { animation : 'employmentStatus' },canLoad :[AuthenticationGuard] },
  { path: 'employee/status', loadChildren: 'app/features/employee-status/employee-status.module#EmployeeStatusModule', data : { animation : 'employeeStatus' },canLoad :[AuthenticationGuard] },
  { path: 'units', loadChildren: 'app/features/units/units.module#UnitsModule', data : { animation : 'units' },canLoad :[AuthenticationGuard] },


  { path: 'employee/register', loadChildren: 'app/features/employee-register/employee-register.module#EmployeeRegisterModule', data : { animation : 'employee' },canLoad :[AuthenticationGuard] },
  { path: 'employee/list', loadChildren: 'app/features/employee-list/employee-list.module#EmployeeListModule', data : { animation : 'employee/list' },canLoad :[AuthenticationGuard] },
  { path: 'employee/details/:empNum/:id', loadChildren: 'app/features/employee-details/employee-details.module#EmployeeDetailsModule', data : { animation : 'employee/detail' },canLoad :[AuthenticationGuard] },
  {path : '404/page-not-found', component : PageNotFoundComponent, data: { animation : 'page-not-found' } },
  { path: '**', pathMatch: 'full', redirectTo : '404/page-not-found'  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
