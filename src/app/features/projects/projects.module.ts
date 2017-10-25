import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from "./../../shared/shared.module";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';

import { ProjectsService } from "./projects.service";

import { reducers } from "./reducers";
import { ProjectsTableEffects } from "./effects/projects-table.effects";
import { ProjectsTableComponent } from './projects-table/projects-table.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    SharedModule,
    StoreModule.forFeature('featureProjects',reducers),
    EffectsModule.forFeature([ProjectsTableEffects])
  ],
  declarations: [ProjectsComponent, ProjectsTableComponent],
  providers:[ProjectsService]
})
export class ProjectsModule { }
