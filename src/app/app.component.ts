import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Router } from "@angular/router";

import { ToastsManager } from "ng2-toastr/ng2-toastr";

import { Subscription } from "rxjs/Subscription";
import { ToolbarLoaderService } from "./main-content/services";

import { Store } from "@ngrx/store";
import * as mainAction from './main-content/actions/main-content.actions';
import * as fromMain from './main-content/reducers/main-content.reducers';


import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, OnDestroy {
  
  /**
   * Combine all your subscriber in one property to easily unsubscribe
   */
  subscriber : Subscription;

  /**
   * Observable of boolean to hide and show the toolbar loader navigation
   */
  isToolbarLoader$ : Observable<boolean>;

  /**
   * Router State Observable
   */
  routerState : Observable<any>;

  constructor(private _store : Store<fromMain.State>, private _router : Router, private _toolbarLoader : ToolbarLoaderService, private _routerStore : Store<any>, private _toastr : ToastsManager, private _vcr : ViewContainerRef){
    /**
     * A slice of state for toolbar loader from mainContent
     */
    this.isToolbarLoader$ = this._store.select(fromMain.getIsToolbarLoader);

    /**
     * A slice of state for router from routerReducer Store
     */
    this.routerState = this._routerStore.select('routerReducer');

    /**
     * Set the ViewContainerRef of the ng2-toastr
     */
    this._toastr.setRootViewContainerRef(this._vcr);
  }

  ngOnInit(){
    /**
     * Listen and Subscribe to router events to toggle the toolbar loader indicator
     */
    this.subscriber = this._router.events.subscribe( (ev) => { 

      this._toolbarLoader.routerNavigationInterceptor(ev);
    
    });

    /**
     * Subscribe to routerState from the store
     */
    this.subscriber.add(

      this.routerState.subscribe((route) => {
        // Check of the response is not undefined to avoid errors when accessing the response object
          if(route != undefined){
            //Check if the router state url is /login and dispatch the mainAction.IsLoginPage to hide the toolbar and sidenav for login page layout
            if(route.state != undefined){
              if(route.state.url === '/login'){
                this._store.dispatch( new mainAction.IsLoginPage(true) );
              }
              else{
                this._store.dispatch( new mainAction.IsLoginPage(false) );
              }
            }
            
          }
      })

    );
  }

  ngOnDestroy() {
    /**
     * Unsubsribe to all subscriptions to avoid memory leaks after the component is destroyed
     */
    this.subscriber.unsubscribe();
  }


  

}
