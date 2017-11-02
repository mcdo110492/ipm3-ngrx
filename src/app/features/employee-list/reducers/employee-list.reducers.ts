import { EmployeeList } from "./../models/employee-list.models";
import * as emp from './../actions/employee-list.actions';

export interface State {
 pageLength                     : number;
 pageSize                       : number;
 pageIndex                      : number;
 sortField                      : string;
 sortDirection                  : string;
 searchQuery                    : string;
 collections                    : EmployeeList[];
 error                          : any;  
 isLoading                      : boolean;
}

export const initialState: State = {
    pageLength                  : 0,
    pageSize                    : 5,
    pageIndex                   : 0,
    sortField                   : 'employeeNumber',
    sortDirection               : 'asc',
    searchQuery                 : '',  
    collections                 : null,
    error                       : null,
    isLoading                   : false
}


export function reducer(state: State = initialState, action: emp.Actions): State {
    switch (action.type) {

        case emp.LOAD : {
            return { ...state, isLoading : true };
        }

        case emp.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoading : false };
        }

        case emp.LOAD_ERROR : {
            
            return { ...state, error : action.payload, isLoading: false};
        }

        case emp.SEARCH : {

            return { ...state, searchQuery : action.payload, isLoading : true };

        }

        case emp.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex };

        }

        case emp.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection };

        }


        default:
            return state;
    }
}


/* 
    Below are the selectors for this reducer. Make sure to make compact selectors as per 
    requirements of your application.
*/

export const getPageLength = (state : State) => state.pageLength;

export const getPageSize = (state : State) => state.pageSize;

export const getPageIndex = (state : State) => state.pageIndex;

export const getSortField = (state : State) => state.sortField;

export const getSortDirection = (state : State) => state.sortDirection;

export const getSearchQuery = (state : State) => state.searchQuery;

export const getCollections = (state: State) => state.collections;

export const getError = (state: State) => state.error;

export const getIsLoading = (state : State) => state.isLoading;

