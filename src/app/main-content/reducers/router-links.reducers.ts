import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as linksActions from './../actions/router-links.actions';
import { RouterLinks } from './../models/router-links.model';



export interface State {
    links : RouterLinks [];
} 

export const initialState: State = {
    links : []
};


export function reducer(state: State = initialState, action: linksActions.Actions): State {
    switch (action.type) {

        case linksActions.ROLE_ROUTER_LINKS : {
            return { ...state , links : action.payload };
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getRouterLinks = createFeatureSelector<State>('routerLinks');

export const getLinks = createSelector(getRouterLinks, (state : State) => state.links );
