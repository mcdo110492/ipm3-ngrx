import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from "./shared/shared.module";
import { ToastModule } from "ng2-toastr/ng2-toastr";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule, RouterStateSerializer  } from "@ngrx/router-store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { CoreModule } from "./core";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainContentModule, MainContentEffects } from "./main-content";
import { LoginModule } from "./features/login/login.module";

import { reducers, metaReducers } from './reducers';
import { CustomRouterStateSerializer } from "./shared/utils";

import { environment } from "./../environments/environment";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastModule.forRoot(),
    /**
     * CoreModule is imported once in the app root module and do not import it to any other feature modules or it will throw an error and difficult to debug.
     * CoreModule provides some core providers that your entire application uses
     * CoreModule providers once injected can be use widely in your entire application that included lazy loaded feature modules
     */
    CoreModule,

    /**
     * MainContent Module is the main layout of entire applications
     */
    MainContentModule,

    /**
     * Login Module 
     */

    LoginModule,

    /**
     * AppRoutingModule is where you handle all your routes.
     */
    AppRoutingModule,

    /**
    * ngrx-store that will keep the routes up to date
    */
    StoreRouterConnectingModule,

    /**
     * StoreModue.forRoot() is imported once in the root app module and accepting all your reducers. 
     * If you have a feature module use StoreModule.forFeature() instead it support lazy loaded feature and you can use all providers the same as the forRoot()
     */
    StoreModule.forRoot(reducers, { metaReducers }),

    /**
     * StoreDevtoolsModule is a debug tool for ngrx. And it will only be imported if the envirnment is on development
     */
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge : 10 }) : [],

    /**
     * EffectedModule.forRoot() is imported once in the root app module and acceptiong all your effects providers.
     * Injecting the effects providers is the same as injecting the angular services
     */
    EffectsModule.forRoot([MainContentEffects]),


  ],
  providers: [
     /**
     * The `RouterStateSnapshot` provided by the `Router` is a large complex structure.
     * A custom RouterStateSerializer is used to parse the `RouterStateSnapshot` provided
     * by `@ngrx/router-store` to include only the desired pieces of the snapshot.
     */
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
