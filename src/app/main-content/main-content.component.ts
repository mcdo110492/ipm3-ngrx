import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from "@ngrx/store";
import * as mainActions from './actions/main-content.actions';
import * as fromMain from './reducers/main-content.reducers';

import { Observable } from 'rxjs/Observable';
import { Subscription } from "rxjs/Subscription";

import { ObservableMedia, MediaChange } from "@angular/flex-layout";

import { fadeInAnimation } from "./../animations/fade.animations";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss'],
  animations:[fadeInAnimation]
})
export class MainContentComponent implements OnInit, OnDestroy {

  // Subscription for flex-layout observable
  watcher   : Subscription;

  //Observable of stream for the settings of main content
  isSidenavOpen$ : Observable<boolean>;
  sidenavMode$   : Observable<string>;
  isLoginPage$    : Observable<boolean>;

  constructor(private _media : ObservableMedia, private _store : Store<fromMain.State>) {
    /**
     * Get the slices of state of mainContent from ngrx-store
     */
    this.isSidenavOpen$ = this._store.select(fromMain.getIsSidenavOpen);
    this.sidenavMode$   = this._store.select(fromMain.getSidenavMode);
    this.isLoginPage$   = this._store.select(fromMain.getIsLoginPage);
  }

  /* Angular LifeCycle Hooks */
  ngOnInit() {
    //Watches every changes in media breakpoint of flex-layout for changing the settings of sidenav for mobile or desktop
    this.watcher = this._media.subscribe((change: MediaChange) => {
      
        if( change.mqAlias === 'xs' || change.mqAlias === 'sm' ){
          
          this._store.dispatch( new mainActions.SidenavMode({ isSidenavOpen : false , sidenavMode : 'over' }) );

          
          
        }
        else{

            this._store.dispatch( new mainActions.SidenavMode({ isSidenavOpen : true , sidenavMode : 'side' }) );
 
          
        }

    });
  }

  ngOnDestroy(){
    //unsubscribe to the wathcher subscription to avoid memory leaks
    this.watcher.unsubscribe();
  }
  /* End of Angular LifeCycle Hooks */

  /**
   * This for animating every routes with a data 'animation'
   * @param outlet 
   */
  prepRouteState(outlet : any){
    return outlet.activatedRouteData.animation;
  }

  /**
   * Method that will listen to an event when clicking the sidenav outside of its content to reset the state to false in mode 'over'
   */
  onSidenavBackdropClick(){
    this._store.dispatch( new mainActions.SidenavToggle() );
  }

}
