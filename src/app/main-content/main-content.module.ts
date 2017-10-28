import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { SharedModule } from "./../shared/shared.module";
import 'hammerjs';

import { MainContentComponent } from './main-content.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { ToolbarLoaderService ,LoaderSpinnerComponent, LoaderSpinnerService, ToastrService } from './services';
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [MainContentComponent, ToolbarComponent, SidenavComponent,LoaderSpinnerComponent,BreadcrumbComponent],
  entryComponents:[
    LoaderSpinnerComponent
  ],
  exports:[MainContentComponent],
  providers:[ToolbarLoaderService,LoaderSpinnerService,ToastrService]
})
export class MainContentModule { }
