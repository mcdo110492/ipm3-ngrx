import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListComponent } from "./employee-list.component";

const routes: Routes = [
  { path: '', component: EmployeeListComponent, data :{ animation : 'employee/list/initial' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeListRoutingModule { }
