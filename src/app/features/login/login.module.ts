import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { SharedModule } from "./../../shared/shared.module";

import { LoginComponent } from './login.component';
import { LoginService } from "./login.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  declarations: [LoginComponent],
  providers:[LoginService]
})
export class LoginModule { }
