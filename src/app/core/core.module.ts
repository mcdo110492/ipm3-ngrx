import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

//Authentication Guard for Routes
import { AuthenticationGuard } from "./services/authentication.guard";



/* Only Import Some Global/Core Services that will be use in the entire applications */
/* CoreModule must only be import once in the root AppModule in order to avoid some difficult bug */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    AuthenticationGuard]
})
export class CoreModule {

  /* Check if the CoreModule Already been added in the AppModule */
  constructor(@Optional() @SkipSelf() parentModule : CoreModule){
    if(parentModule){
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only.'
      );
    }
  }
}
