import { Action } from '@ngrx/store';
import { MainContent } from './../models/main-content.model';

export const SIDENAV_TOGGLE         = '[ MAIN ] SidenavToggle';
export const SIDENAV_MODE           = '[ MAIN ] SidenavMode';
export const TOOLBAR_LOADER         = '[ MAIN ] ToolbarLoader';
export const IS_LOGIN_PAGE          = '[ MAIN ] IsLoginPage';
export const CHANGE_PROJECT         = '[ MAIN ] ChangeProject';

export class SidenavToggle implements Action {
  readonly type = SIDENAV_TOGGLE;
  
}

export class SidenavMode implements Action {
    readonly type = SIDENAV_MODE;
  
    constructor(public payload: MainContent) { }
  }

export class ToolbarLoader implements Action {
  readonly type = TOOLBAR_LOADER;

  constructor(public payload : boolean){}
}


export class IsLoginPage implements Action {
  readonly type = IS_LOGIN_PAGE;

  constructor(public payload : boolean){}
}

export class ChangeProject implements Action {
  readonly type = CHANGE_PROJECT;

  constructor(public payload : number){}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= SidenavToggle
| SidenavMode
| ToolbarLoader
| IsLoginPage
| ChangeProject;