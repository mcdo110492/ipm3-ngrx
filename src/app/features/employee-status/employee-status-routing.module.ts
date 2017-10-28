import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeStatusComponent } from "./employee-status.component";

const routes: Routes = [
  { path: '', component: EmployeeStatusComponent, data: { animation : 'employeeStatus/table' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeStatusRoutingModule { }
