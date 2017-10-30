import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from "@angular/common/http";

//Authentication Guard for Routes and Http Interceptor for Token
import { AuthenticationGuard } from "./services/authentication.guard";
import { AuthenticationService } from "./services/authentication.service";
import { NoopInterceptor } from "./services/noop-interceptor.service";

//Provider for uniqueValidationDirective
import { UniqueValidatorService } from "./../shared/unique-validator.service";

//Provider for Master Data
import { MasterDataService } from "./../master-data/master-data.service";




/* Only Import Some Global/Core Services that will be use in the entire applications */
/* CoreModule must only be import once in the root AppModule in order to avoid some difficult bug */
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[
    AuthenticationGuard,
    AuthenticationService,
    UniqueValidatorService,
    { provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true },
    MasterDataService]
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
