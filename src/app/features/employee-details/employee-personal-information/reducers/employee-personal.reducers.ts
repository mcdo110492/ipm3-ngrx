
import { EmployeePersonal } from "./../models/employee-personal.models";
import * as personalActions from "./../actions/employee-personal.actions";

export interface State {
    personal    :   EmployeePersonal;
    error       :   any;
}

export const initialState: State = {
    personal    :   undefined,
    error       :   null
}


export function reducer(state: State = initialState, action: personalActions.Actions): State {
    switch (action.type) {

        case personalActions.GET_PERSONAL_SUCCESS : {

            return { ...state, personal : action.payload };

        }

        case personalActions.GET_PERSONAL_ERROR : {

            return { ...state, error : action.payload };
        }

        case personalActions.SAVE_PERSONAL_SUCCESS : {

            return { ...state, personal : action.payload };
            
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getPersonal = (state: State) => state.personal;

