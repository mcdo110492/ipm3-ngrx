import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PositionsComponent } from './positions.component';

const routes: Routes = [
  { path: '', component: PositionsComponent, data : { animation : 'positions/table' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionsRoutingModule { }
