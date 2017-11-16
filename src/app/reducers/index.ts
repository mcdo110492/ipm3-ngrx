
/**
 * This is the root reducers of your entire application
 * The feature reducers state extends this reducers state
 */
import { ActionReducerMap , ActionReducer, MetaReducer, Action } from '@ngrx/store';
import { environment } from './../../environments/environment';

import { RouterStateUrl } from "./../shared/utils";
import * as fromRouter from '@ngrx/router-store';

/**
 * storeFreeze prevents the state for being mutated.
 */
import { storeFreeze } from "ngrx-store-freeze";


/**
 * Every reducer module's default export is the reducer function itself. In
 * addition, each module should export a type or interface that describes
 * the state of the reducer plus any selector functions. The `* as`
 * notation packages up all of the exports into a single object.
 */
import * as fromMainContent   from './../main-content/reducers/main-content.reducers';
import * as fromRouterLinks   from './../main-content/reducers/router-links.reducers';
import * as fromMasterData    from './../master-data/reducers/master-data.reducers';
import * as fromLoginPresence from './../features/login/reducers/login.reducers';

/**
 * As mentioned, we treat each reducer like a table in a database. This means
 * our top level state interface is just a map of keys to inner state types.
 * The name of the table is the same when you creating a feature selector in your reducers.
 */

export interface State {
     mainContent    : fromMainContent.State,
     routerLinks    : fromRouterLinks.State,
     masterData     : fromMasterData.State,
     loginPresence  : fromLoginPresence.State,
     routerReducer  : fromRouter.RouterReducerState<RouterStateUrl>
 }

/**
 * Our state is composed of a map of action reducer functions.
 * These reducer functions are called with each dispatched action
 * and the current or initial state and return a new immutable state.
 */

export const reducers   :   ActionReducerMap<State> = {
    mainContent         : fromMainContent.reducer,
    routerLinks         : fromRouterLinks.reducer,
    masterData          : fromMasterData.reducer,
    loginPresence       : fromLoginPresence.reducer,
    routerReducer       : fromRouter.routerReducer
  };


export function clearState(reducer : ActionReducer<State>) : ActionReducer<State> {

  return function (state : State, action : Action) : State {

    if(action.type === '[LOGIN] Logout'){
      state = undefined;
    }

    return reducer(state,action);
  }

} 


/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
? [storeFreeze,clearState]
: [clearState];


