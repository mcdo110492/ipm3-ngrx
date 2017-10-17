import { Action } from '@ngrx/store';
import { RouterLinks } from './../models/router-links.model';

export const ROLE_ROUTER_LINKS =           '[ ROUTERLINKS ] RoleRouterLinks';

export class RoleRouterLinks implements Action {
  readonly type = ROLE_ROUTER_LINKS;

  constructor(public payload: RouterLinks[]) { }
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
= RoleRouterLinks;

