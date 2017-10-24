import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";

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

  constructor(private _store : Store<fromMain.State>, private _router : Router, private _toolbarLoader : ToolbarLoaderService, private _routerStore : Store<any>){
    /**
     * A slice of state for toolbar loader from mainContent
     */
    this.isToolbarLoader$ = this._store.select(fromMain.getIsToolbarLoader);

    /**
     * A slice of state for router from routerReducer
     */
    this.routerState = this._routerStore.select('routerReducer');
  }

  ngOnInit(){
    /**
     * Listen and Subscribe to router events to toggle the toolbar loader indicator
     */
    this.subscriber = this._router.events.subscribe( (ev) => { 

      this._toolbarLoader.routerNavigationInterceptor(ev);
    
    });

    /**
     * Add additional subscription
     * Subscribe to routerState observable
     */
   this.subscriber.add(this.routerState.subscribe((response) => {
      // Check of the response is not undefined to avoid errors when accessing the response object
      if(response != undefined){
        //Check if the router state url is /login and dispatch the mainAction.IsLoginPage to hide the toolbar and sidenav for login page layout and otherwise
        if(response.state.url === '/login'){
          this._store.dispatch( new mainAction.IsLoginPage(true) );
        }
        else {
          this._store.dispatch( new mainAction.IsLoginPage(false) );
        }

      }

   }));
  }

  ngOnDestroy() {
    /**
     * Unsubsribe to all subscriptions to avoid memory leaks after the component is destroyed
     */
    this.subscriber.unsubscribe();
  }




}
