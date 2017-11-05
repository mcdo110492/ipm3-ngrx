import * as license from './../actions/employee-license.actions';
import { EmployeeLicense } from "./../models/employee-licenses.models";

export interface State {
    collections        : EmployeeLicense[];
    selectedCollection : EmployeeLicense;
}

export const initialState: State = {
    collections             :   [],
    selectedCollection      :   null
}


export function reducer(state: State = initialState, action: license.Actions): State {
    switch (action.type) {

        case license.LOAD_SUCCESS : {
            
            return { ...state, collections : action.payload };
        }

        case license.SELECTED_LICENSE : {

            return { ...state, selectedCollection : action.payload };

        }

        case license.CLEAR_SELECTED : {

            return { ...state, selectedCollection : null };

        }

        case license.SAVE_LICENSE : {

            return { ...state, selectedCollection : action.payload};

        }

        case license.SAVE_LICENSE_SUCCESS : {

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