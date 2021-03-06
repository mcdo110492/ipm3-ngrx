
import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as loginActions from './../actions/login.actions';
import { LoginResponse } from "./../models/login.model";

export type State = LoginResponse;

export function getPresence() {
    const presence =  JSON.parse(localStorage.presence || null);
    if(presence != null){
        return {
            token           : presence.token,
            profileName     : presence.profileName,
            profileImage    : presence.profileImage,
            role            : presence.role,
            status          : presence.status
        };
    }
    else{
        return {
            token           : null,
            profileName     : null,
            profileImage    : 'avatars/default.jpg',
            role            : null,
            status          : null
        };
    }
}

const currentPresence = getPresence();

export const initialState: State = {
    token           :   currentPresence.token,
    profileName     :   currentPresence.profileName,
    profileImage    :   currentPresence.profileImage,
    role            :   currentPresence.role,
    status          :   currentPresence.status
}


export function reducer(state: State = initialState, action: loginActions.Actions): State {
    switch (action.type) {

        case loginActions.LOGIN_SUCCESS : {
            
            localStorage.setItem('presence',JSON.stringify(action.payload));
            return { ...state, 
                token : action.payload.token,
                profileName : action.payload.profileName,
                profileImage : action.payload.profileImage,
                role : action.payload.role,
                status: action.payload.status
            };
        }

        case loginActions.LOGOUT : {
            localStorage.removeItem('presence');
            return { ...state, 
                token : null,
                profileName : null,
                profileImage : 'assets/default.jpg',
                role : null,
                status: null
            };
        }
    
        default:
            return state;
    }
}




/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getLoginContent = createFeatureSelector<State>('loginPresence');

export const getProfileName = createSelector(getLoginContent, (state : State) => state.profileName );

export const getProfileImage = createSelector(getLoginContent, (state : State) => state.profileImage );

export const getRole = createSelector(getLoginContent, (state : State) => state.role );