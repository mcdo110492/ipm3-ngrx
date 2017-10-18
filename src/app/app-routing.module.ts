import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./features/login/login.component";
import { FeatureContentComponent } from "./main-content/feature-content/feature-content.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main2' },
  { path :'main2' , component : FeatureContentComponent , data : { animation :'main2' }},
  { path :'main3' , component : FeatureContentComponent , data : { animation :'main3' }},
  { path :'login', component :  LoginComponent, data : { animation: 'login' }},
  { path: 'table', loadChildren: 'app/features/material-table/material-table.module#MaterialTableModule', data: { animation : 'table' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
