
import * as empActions from "./../actions/employee-register.actions";
import { EmployeeRegister } from "./../models/employee-register.model";


export interface State {
    employeeRegister : EmployeeRegister;
}

export const initialState: State = {
    employeeRegister : null
}


export function reducer(state: State = initialState, action: empActions.Actions): State {
    switch (action.type) {

        case empActions.SAVE :{ 

            return { ...state, employeeRegister : action.payload};

        }

        case empActions.SUBMIT_SUCCESS : {

            return { ...state, employeeRegister : null };

        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const geEmployeeRegister = (state: State) => state.employeeRegister;
