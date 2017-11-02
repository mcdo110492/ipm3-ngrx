

import * as empDetails from "./../actions/employee-details.actions";

export interface State {
    employeeId    :   number
}

export const initialState: State = {
    employeeId    :   null
}


export function reducer(state: State = initialState, action: empDetails.Actions): State {
    switch (action.type) {

        case empDetails.GET_EMPLOYEE_ID : {

            return { ...state, employeeId : action.payload };

        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getEmployeeId = (state: State) => state.employeeId;
