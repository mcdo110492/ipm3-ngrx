import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { EquipmentsRoutingModule } from './equipments-routing.module';
import { EquipmentsComponent } from './equipments.component';
import { EquipmentsTableComponent } from './equipments-table/equipments-table.component';
import { EquipmentsFormComponent } from './equipments-form/equipments-form.component';
import { EquipmentsService } from './equipments.service';

import { reducers } from "./reducers";
import { EquipmentsEffects } from './effects/equipments.effects';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EquipmentsRoutingModule,
    StoreModule.forFeature('featureEquipments',reducers),
    EffectsModule.forFeature([EquipmentsEffects])
  ],
  declarations: [EquipmentsComponent, EquipmentsTableComponent, EquipmentsFormComponent],
  entryComponents: [EquipmentsFormComponent],
  providers: [EquipmentsService]
})
export class EquipmentsModule { }
