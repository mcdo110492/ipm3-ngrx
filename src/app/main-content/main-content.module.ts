import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SharedModule } from "./../shared/shared.module";
import 'hammerjs';

import { MainContentComponent } from './main-content.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

import { ToolbarLoaderService ,LoaderSpinnerComponent, LoaderSpinnerService } from './services';

import { FeatureContentComponent } from './feature-content/feature-content.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [MainContentComponent, ToolbarComponent, SidenavComponent, FeatureContentComponent, BreadcrumbComponent,LoaderSpinnerComponent],
  entryComponents:[
    LoaderSpinnerComponent
  ],
  exports:[MainContentComponent],
  providers:[ToolbarLoaderService,LoaderSpinnerService]
})
export class MainContentModule { }
