import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { CollectionSchedulesRoutingModule } from './collection-schedules-routing.module';
import { CollectionSchedulesFormComponent } from './collection-schedules-form/collection-schedules-form.component';
import { CollectionSchedulesTableComponent } from './collection-schedules-table/collection-schedules-table.component';
import { CollectionSchedulesComponent } from './collection-schedules.component';

import { CollectionSchedulesService } from './collection-schedules.service';

import { reducers } from "./reducers";
import { CollectionSchedulesEffects } from './effects/collection-schedules.effects';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CollectionSchedulesRoutingModule,
    StoreModule.forFeature('featureCollectionSchedules',reducers),
    EffectsModule.forFeature([CollectionSchedulesEffects])
  ],
  declarations: [CollectionSchedulesFormComponent, CollectionSchedulesTableComponent, CollectionSchedulesComponent],
  entryComponents: [CollectionSchedulesFormComponent],
  providers: [CollectionSchedulesService]
})
export class CollectionSchedulesModule { }
