import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { SharedModule } from '../../shared/shared.module';
import { CalendarModule } from "primeng/components/calendar/calendar";

import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsComponent } from './shifts.component';
import { ShiftsTableComponent } from './shifts-table/shifts-table.component';
import { ShiftsFormComponent } from './shifts-form/shifts-form.component';
import { ShiftsService } from './shifts.service';

import { reducers } from "./reducers";
import { ShiftsEffects } from './effects/shifts.effects';

@NgModule({
  imports: [
    CommonModule,
    ShiftsRoutingModule,
    SharedModule,
    CalendarModule,
    StoreModule.forFeature('featureShifts',reducers),
    EffectsModule.forFeature([ShiftsEffects])
  ],
  declarations: [ShiftsComponent, ShiftsTableComponent, ShiftsFormComponent],
  entryComponents:[ShiftsFormComponent],
  providers:[ShiftsService]
})
export class ShiftsModule { }
