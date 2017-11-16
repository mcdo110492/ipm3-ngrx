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

//Moment Service to parse the date before passing to http request
import { MomentService } from "./services/moment.service";




/* Only Import Some Global/Core Services that will be use in the entire applications */
/* CoreModule must only be import once in the root module in order to avoid some difficult unknown bug */
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
    MasterDataService,
    MomentService]
})
export class CoreModule {

  /* Check if the CoreModule Already been added in the root app module */
  constructor(@Optional() @SkipSelf() parentModule : CoreModule){
    if(parentModule){
      throw new Error(
        'CoreModule is already loaded. Import it in your Root App Module only.'
      );
    }
  }
}
