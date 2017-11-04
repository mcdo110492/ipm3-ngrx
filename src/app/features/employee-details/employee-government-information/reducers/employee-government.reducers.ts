
import { EmployeeGovernment } from "./../models/employee-government.model";
import * as government from "./../actions/employee-government.actions";

export interface State {
    government     :   EmployeeGovernment;
    error          :   any;
}

export const initialState: State = {
    government     :   undefined,
    error          :   null
}


export function reducer(state: State = initialState, action: government.Actions): State {
    switch (action.type) {

        case government.GET_GOVERNMENT_SUCCESS : {

            return { ...state, government : action.payload };

        }

        case government.GET_GOVERNMENT_ERROR : {

            return { ...state, error : action.payload };
        }

        case government.SAVE_GOVERNMENT_SUCCESS : {

            return { ...state, government : action.payload };
            
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getGovernment = (state: State) => state.government;

