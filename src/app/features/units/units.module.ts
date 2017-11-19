import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { UnitsRoutingModule } from './units-routing.module';
import { UnitsComponent } from './units.component';
import { UnitsTableComponent } from './units-table/units-table.component';
import { UnitsFormComponent } from './units-form/units-form.component';
import { UnitsService } from './units.service';

import { reducers } from "./reducers";
import { UnitsEffects } from './effects/units.effects';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UnitsRoutingModule,
    StoreModule.forFeature('featureUnits',reducers),
    EffectsModule.forFeature([UnitsEffects])
  ],
  declarations: [UnitsComponent, UnitsTableComponent, UnitsFormComponent],
  entryComponents: [UnitsFormComponent],
  providers:[UnitsService]
})
export class UnitsModule { }
