import { Injectable } from '@angular/core';

import { Event ,NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { Store } from "@ngrx/store";
import * as mainActions from './../../main-content/actions/main-content.actions';
import * as fromMain from './../../main-content/reducers/main-content.reducers';

import { environment } from "./../../../environments/environment";

@Injectable()
export class ToolbarLoaderService {


  constructor(private _store : Store<fromMain.State>){}

  

  routerNavigationInterceptor (event : Event){ // Check the router events of the router

    if(event instanceof NavigationStart){

      this._store.dispatch( new mainActions.ToolbarLoader(true) );

    }
    else if(event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError){
    
      if(!environment.production){
        setTimeout(() => { //this is only temporary in order to delay the toolbar indicator but will be removed in production mode
            
            this._store.dispatch( new mainActions.ToolbarLoader(false) );
            
        }, 1000 );
      }
      else{
        this._store.dispatch( new mainActions.ToolbarLoader(false) );
      }
       
    }

  }


}
