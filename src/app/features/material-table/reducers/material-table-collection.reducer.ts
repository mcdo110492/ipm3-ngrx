

import * as mat from './../actions/material-table.actions';
import { Element } from "./../models/material-table.model";
import { createSelector } from '@ngrx/store';

export interface State {
    elements : Element[],
    selectedElementId : number;
    loading : boolean;
} 

export const initialState: State = {
    elements: [],
    selectedElementId : null,
    loading : false
}


export function reducer(state: State = initialState, action: mat.Actions): State {
    switch (action.type) {

        case mat.LOAD_ELEMENTS : {
            return { ...state, loading: true };
        }

        case mat.LOAD_ELEMENTS_SUCCESS : {
            return { ...state, loading: false, elements: action.payload };
        }

        case mat.SELECTED_ELEMENT : {
            return { ...state , selectedElementId : action.payload };
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getElements = (state: State) => state.elements;

export const getSelectedElement = (state: State) => state.selectedElementId;

export const getLoding = (state : State) => state.loading;