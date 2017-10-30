import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeRegisterComponent } from "./employee-register.component";

const routes: Routes = [
  { path: '', component: EmployeeRegisterComponent, data : { animation:'employee/register' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRegisterRoutingModule { }
