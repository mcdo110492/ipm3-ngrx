import * as club from './../actions/employee-club.actions';
import { EmployeeClub } from "./../models/employee-club.model";

export interface State {
    collections        : EmployeeClub[];
    selectedCollection : EmployeeClub;
}

export const initialState: State = {
    collections             :   [],
    selectedCollection      :   null
}


export function reducer(state: State = initialState, action: club.Actions): State {
    switch (action.type) {

        case club.LOAD_SUCCESS : {
            
            return { ...state, collections : action.payload };
        }

        case club.SELECTED_CLUB : {

            return { ...state, selectedCollection : action.payload };

        }

        case club.CLEAR_SELECTED : {

            return { ...state, selectedCollection : null };

        }

        case club.SAVE_CLUB : {

            return { ...state, selectedCollection : action.payload};

        }

        case club.SAVE_CLUB_SUCCESS : {

            return { ...state, selectedCollection : null };
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getCollections = (state: State) => state.collections;

export const getSelected = (state: State) => state.selectedCollection;