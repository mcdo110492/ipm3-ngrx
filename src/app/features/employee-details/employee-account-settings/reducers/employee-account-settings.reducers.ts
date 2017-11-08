
import * as account from "./../actions/employee-account-settings.actions";
import { EmployeeAccountSettings } from "./../models/employee-account-settings.model";

export interface State {
    employeeAccountId   :   number;
    username            :   string;
    status              :   number;
    
}

export const initialState: State = {
    employeeAccountId : 0,
    username          : null,
    status            : 0
}


export function reducer(state: State = initialState, action: account.Actions): State {
    switch (action.type) {

        case account.LOAD_SUCCESS : {

            return {...state , employeeAccountId : action.payload.employeeAccountId, 
                               username : action.payload.username,
                               status : action.payload.status };

        }

        case account.CHANGE_STATUS_SUCCESS : {

            return { ...state, status : action.payload };

        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getEmployeeAccountId = (state: State) => state.employeeAccountId;

export const getUserame = (state: State) => state.username;

export const getStatus  = (state : State) => state.status;