import * as educational from './../actions/employee-educational.actions';
import { EmployeeEducational } from "./../models/employee-educational.model";

export interface State {
    collections        : EmployeeEducational[];
    selectedCollection : EmployeeEducational;
}

export const initialState: State = {
    collections             :   [],
    selectedCollection      :   null
}


export function reducer(state: State = initialState, action: educational.Actions): State {
    switch (action.type) {

        case educational.LOAD_SUCCESS : {
            
            return { ...state, collections : action.payload };
        }

        case educational.SELECTED_EDUCATIONAL : {

            return { ...state, selectedCollection : action.payload };

        }

        case educational.CLEAR_SELECTED : {

            return { ...state, selectedCollection : null };

        }

        case educational.SAVE_EDUCATIONAL : {

            return { ...state, selectedCollection : action.payload};

        }

        case educational.SAVE_EDUCATIONAL_SUCCESS : {

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