import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeDetailsComponent } from "./employee-details.component";


const routes: Routes = [
  { path: '', component: EmployeeDetailsComponent, data:{ animation : 'employee/details' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsRoutingModule { }
