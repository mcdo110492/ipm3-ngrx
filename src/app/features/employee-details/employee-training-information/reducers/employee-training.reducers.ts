import * as training from './../actions/employee-training.actions';
import { EmployeeTraining } from "./../models/employee-training.model";

export interface State {
    collections        : EmployeeTraining[];
    selectedCollection : EmployeeTraining;
}

export const initialState: State = {
    collections             :   [],
    selectedCollection      :   null
}


export function reducer(state: State = initialState, action: training.Actions): State {
    switch (action.type) {

        case training.LOAD_SUCCESS : {
            
            return { ...state, collections : action.payload };
        }

        case training.SELECTED_TRAINING : {

            return { ...state, selectedCollection : action.payload };

        }

        case training.CLEAR_SELECTED : {

            return { ...state, selectedCollection : null };

        }

        case training.SAVE_TRAINING : {

            return { ...state, selectedCollection : action.payload};

        }

        case training.SAVE_TRAINING_SUCCESS : {

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