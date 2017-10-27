import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from "./../../shared/shared.module";

import { PositionsRoutingModule } from './positions-routing.module';
import { PositionsComponent } from './positions.component';
import { PositionsTableComponent } from './positions-table/positions-table.component';
import { PositionsFormComponent } from './positions-form/positions-form.component';

import { PositionsService } from "./positions.service";

import { reducers } from "./reducers";
import { PositionTableEffects } from "./effects/position.effects";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PositionsRoutingModule,
    StoreModule.forFeature('featurePositions',reducers),
    EffectsModule.forFeature([PositionTableEffects])
  ],
  declarations: [PositionsComponent, PositionsTableComponent, PositionsFormComponent],
  entryComponents :[PositionsFormComponent],
  providers: [PositionsService]
})
export class PositionsModule { }
