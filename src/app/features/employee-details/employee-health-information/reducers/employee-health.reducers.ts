
import { EmployeeHealth } from "./../models/employee-health.model";
import * as health from "./../actions/employee-health.actions";

export interface State {
    health      :   EmployeeHealth;
    error       :   any;
}

export const initialState: State = {
    health      :   undefined,
    error       :   null
}


export function reducer(state: State = initialState, action: health.Actions): State {
    switch (action.type) {

        case health.GET_HEALTH_SUCCESS : {

            return { ...state, health : action.payload };

        }

        case health.GET_HEALTH_ERROR : {

            return { ...state, error : action.payload };
        }

        case health.SAVE_HEALTH_SUCCESS : {

            return { ...state, health : action.payload };
            
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getHealth = (state: State) => state.health;

