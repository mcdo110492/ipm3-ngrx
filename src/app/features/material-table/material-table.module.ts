import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from "./../../shared/shared.module";

import { MaterialTableRoutingModule } from './material-table-routing.module';
import { MaterialTableComponent } from './material-table.component';

import { MaterialTableService } from "./material-table.service";

import { reducers } from './reducers';
import { MaterialTableEffects } from './effects/material-table.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialTableRoutingModule,
    StoreModule.forFeature('elements', reducers),
    EffectsModule.forFeature([MaterialTableEffects])
  ],
  declarations: [MaterialTableComponent],
  providers:[MaterialTableService]
})
export class MaterialTableModule { }
