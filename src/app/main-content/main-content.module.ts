import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import { SharedModule } from "./../shared/shared.module";
import 'hammerjs';

import { MainContentComponent } from './main-content.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { ToolbarLoaderService ,LoaderSpinnerComponent, LoaderSpinnerService, ToastrService, ConfirmDialogService } from './services';
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { ConfirmDialogComponent } from './services/confirm-dialog/confirm-dialog.component';
import { ProjectSelectComponent } from './project-select/project-select.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [MainContentComponent, ToolbarComponent, SidenavComponent,LoaderSpinnerComponent,BreadcrumbComponent, ConfirmDialogComponent, ProjectSelectComponent, PageNotFoundComponent],
  entryComponents:[
    LoaderSpinnerComponent,
    ConfirmDialogComponent
  ],
  exports:[MainContentComponent],
  providers:[ToolbarLoaderService,LoaderSpinnerService,ToastrService,ConfirmDialogService]
})
export class MainContentModule { }
