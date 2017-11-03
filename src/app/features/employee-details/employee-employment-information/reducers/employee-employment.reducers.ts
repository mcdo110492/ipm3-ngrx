
import { EmployeeEmployment } from "./../models/employee-employment.model";
import * as employmentActions from "./../actions/employee-employment.actions";

export interface State {
    employment    :   EmployeeEmployment;
    error         :   any;
}

export const initialState: State = {
    employment    :   undefined,
    error         :   null
}


export function reducer(state: State = initialState, action: employmentActions.Actions): State {
    switch (action.type) {

        case employmentActions.GET_EMPLOYMENT_SUCCESS : {

            return { ...state, employment : action.payload };

        }

        case employmentActions.GET_EMPLOYMENT_ERROR : {

            return { ...state, error : action.payload };
        }

        case employmentActions.SAVE_EMPLOYMENT_SUCCESS : {

            return { ...state, employment : action.payload };
            
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getEmployment = (state: State) => state.employment;

