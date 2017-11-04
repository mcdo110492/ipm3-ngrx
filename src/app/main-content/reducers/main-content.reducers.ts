import { createSelector, createFeatureSelector } from "@ngrx/store";
import * as mainActions from './../actions/main-content.actions';
import { MainContent } from './../models/main-content.model';



export type State = MainContent;

export const initialState: MainContent = {
    isSidenavOpen       :   true,
    sidenavMode         :   'side',
    isToolbarLoader     :   false,
    isLoginPage         :   true,
    currentProjectId    :   +localStorage.getItem('projectId') || 1
}


export function reducer(state: MainContent = initialState, action: mainActions.Actions): MainContent {
    switch (action.type) {

        case mainActions.SIDENAV_TOGGLE : {
            return {...state , isSidenavOpen : !state.isSidenavOpen };
        }

        case mainActions.SIDENAV_MODE : {
            return {...state , sidenavMode : action.payload.sidenavMode , isSidenavOpen: action.payload.isSidenavOpen };
        }

        case mainActions.TOOLBAR_LOADER : {
            return { ...state , isToolbarLoader : action.payload };
        }

        case mainActions.IS_LOGIN_PAGE : {
            return { ...state , isLoginPage : action.payload };
        }

        case mainActions.CHANGE_PROJECT : {
            return { ...state, currentProjectId : action.payload };
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getMainContent = createFeatureSelector<MainContent>('mainContent');

export const getIsSidenavOpen = createSelector(getMainContent, (state : MainContent) => state.isSidenavOpen);

export const getSidenavMode = createSelector(getMainContent, (state : MainContent) => state.sidenavMode);

export const getIsToolbarLoader = createSelector(getMainContent, (state : MainContent) => state.isToolbarLoader );

export const getIsLoginPage  = createSelector(getMainContent, (state : MainContent) => state.isLoginPage);

export const getCurrentProject = createSelector(getMainContent, (state : State) => state.currentProjectId);