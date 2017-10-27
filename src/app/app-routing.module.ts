import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./features/login/login.component";
import { FeatureContentComponent } from "./main-content/feature-content/feature-content.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'main2' },
  { path :'main2' , component : FeatureContentComponent , data : { animation :'main2' }},
  { path :'login', component :  LoginComponent, data : { animation: 'login' }},
  { path: 'projects', loadChildren: 'app/features/projects/projects.module#ProjectsModule', data : { animation : 'projects' } },
  { path: 'positions', loadChildren: 'app/features/positions/positions.module#PositionsModule', data : { animation : 'positions' } },
  { path: 'employment/status', loadChildren: 'app/features/employment-status/employment-status.module#EmploymentStatusModule', data : { animation : 'employmentStatus' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
