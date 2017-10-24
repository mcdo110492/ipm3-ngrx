
import * as mat from './../actions/material-table.actions';
import { PageSettings, SortSettings } from "./../models/material-table.model";
import { createSelector } from '@ngrx/store';

export interface State {
    page : PageSettings,
    sort : SortSettings
};

export const initialState: State = {
    page : {
        pageLength      : 0,
        pageSize        : 5,
        pageSizeOptions : [5, 10, 20, 30, 50, 100],
        pageIndex       : 0
    },
    sort : { sortField : '', sortDirection: 'asc' }
}


export function reducer(state: State = initialState, action: mat.Actions): State {
    switch (action.type) {

        case mat.PAGINATE : {
          return { ...state , page:{ pageLength : action.payload.pageLength,
                              pageIndex  : action.payload.pageIndex,
                              pageSize   : action.payload.pageSize,
                              pageSizeOptions : state.page.pageSizeOptions } };
        }

        case mat.SORT : {
            return { ...state, sort: { sortField: action.payload.sortField, sortDirection: action.payload.sortDirection } };
        }

        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getPageLength = (state: State) => state.page.pageLength;

export const getPageSize = (state: State) => state.page.pageSize;

export const getPageSizeOptions = (state: State) => state.page.pageSizeOptions;

export const getPageIndex = (state : State) => state.page.pageIndex;

export const getSortField = (state : State) => state.sort.sortField;

export const getSortDirection = (state : State) => state.sort.sortDirection;
