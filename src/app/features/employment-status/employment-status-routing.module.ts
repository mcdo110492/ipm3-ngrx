import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmploymentStatusComponent } from "./employment-status.component";

const routes: Routes = [
  { path: '', component: EmploymentStatusComponent, data : { animation : 'employmentStatus/table' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmploymentStatusRoutingModule { }
