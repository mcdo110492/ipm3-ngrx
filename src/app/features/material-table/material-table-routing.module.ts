import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialTableComponent } from "./material-table.component";

const routes: Routes = [
  { path: '', component: MaterialTableComponent, data : { animation : 'table/list' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialTableRoutingModule { }
