
import * as mat from './../actions/material-table.actions';
import { Search } from "./../models/material-table.model";
import { createSelector } from '@ngrx/store';

export type State = Search;

export const initialState: State = {
    loading : false,
    query   :  '',
    error   :  ''
}


export function reducer(state: State = initialState, action: mat.Actions): State {
    switch (action.type) {

        case mat.SEARCH : {
            const query = state.query;

            if(query === ''){
                return { loading: false, query, error: '' }; 
            }

            return {...state , loading: true, query, error: ''};
        }

        case mat.SEARCH_COMPLETE : {
            return { ...state, loading: false, error: '', query: state.query };
        }

        case mat.SEARCH_ERROR : {
            return { ...state, loading: false, error: action.payload };
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getQuery = (state: State) => state.query;

export const getLoading = (state: State) => state.loading;

export const getError = (state: State) => state.error;