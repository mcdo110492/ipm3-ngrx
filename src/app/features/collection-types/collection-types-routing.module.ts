import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CollectionTypesComponent } from './collection-types.component';

const routes: Routes = [
  { path: '', component: CollectionTypesComponent, data :{ animation : 'collection/types/list' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionTypesRoutingModule { }
