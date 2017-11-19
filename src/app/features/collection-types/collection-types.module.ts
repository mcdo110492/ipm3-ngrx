import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';

import { CollectionTypesRoutingModule } from './collection-types-routing.module';
import { CollectionTypesComponent } from './collection-types.component';
import { CollectionTypesTableComponent } from './collection-types-table/collection-types-table.component';
import { CollectionTypesFormComponent } from './collection-types-form/collection-types-form.component';

import { CollectionTypesService } from './collection-types.service';
import { CollectionTypesEffects } from './effects/collection-types.effects';
import { reducers } from "./reducers";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CollectionTypesRoutingModule,
    StoreModule.forFeature('featureCollectionTypes',reducers),
    EffectsModule.forFeature([CollectionTypesEffects])
  ],
  declarations: [CollectionTypesComponent, CollectionTypesTableComponent, CollectionTypesFormComponent],
  entryComponents:[CollectionTypesFormComponent],
  providers:[CollectionTypesService]
})
export class CollectionTypesModule { }
