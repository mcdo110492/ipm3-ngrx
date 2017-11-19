import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionSchedulesComponent } from './collection-schedules.component';

const routes: Routes = [
  { path: '', component: CollectionSchedulesComponent, data :{ animation : 'collection/schedules/list' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionSchedulesRoutingModule { }
