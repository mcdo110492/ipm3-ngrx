
import { EmployeeContact } from "./../models/employee-contact.model";
import * as contact from "./../actions/employee-contact.actions";

export interface State {
    contact    :   EmployeeContact;
    error       :   any;
}

export const initialState: State = {
    contact     :   undefined,
    error       :   null
}


export function reducer(state: State = initialState, action: contact.Actions): State {
    switch (action.type) {

        case contact.GET_CONTACT_SUCCESS : {

            return { ...state, contact : action.payload };

        }

        case contact.GET_CONTACT_ERROR : {

            return { ...state, error : action.payload };
        }

        case contact.SAVE_CONTACT_SUCCESS : {

            return { ...state, contact : action.payload };
            
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getContact = (state: State) => state.contact;

