import { EmployeeStatus } from "./../models/employee-status.model";
import * as employeeStatusActions from './../actions/employee-status.actions';

export interface State {
 pageLength                     : number;
 pageSize                       : number;
 pageIndex                      : number;
 sortField                      : string;
 sortDirection                  : string;
 searchQuery                    : string;
 collections                    : EmployeeStatus[];
 selectedCollection             : EmployeeStatus; 
 error                          : any;  
 isLoading                      : boolean;
}

export const initialState: State = {
    pageLength                  : 0,
    pageSize                    : 5,
    pageIndex                   : 0,
    sortField                   : 'employeeStatusName',
    sortDirection               : 'asc',
    searchQuery                 : '',  
    collections                 : null,
    selectedCollection          : null,
    error                       : null,
    isLoading                   : false
}


export function reducer(state: State = initialState, action: employeeStatusActions.Actions): State {
    switch (action.type) {

        case employeeStatusActions.LOAD : {
            return { ...state, isLoading : true };
        }

        case employeeStatusActions.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoading : false };
        }

        case employeeStatusActions.LOAD_ERROR : {
            
            return { ...state, error : action.payload, isLoading: false};
        }

        case employeeStatusActions.SEARCH : {

            return { ...state, searchQuery : action.payload, isLoading : true };

        }

        case employeeStatusActions.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex };

        }

        case employeeStatusActions.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection };

        }

        case employeeStatusActions.SELECT_EMPLOYEE_STATUS : {

            return { ...state, selectedCollection : action.payload };

        }

        case employeeStatusActions.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.employeeStatusId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    }
                }

                return item;
            });

            return { ...state, collections : updatedData};

        }

        case employeeStatusActions.CLEAR_SELECT_EMPLOYEE_STATUS : {

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

export const getPageLength = (state : State) => state.pageLength;

export const getPageSize = (state : State) => state.pageSize;

export const getPageIndex = (state : State) => state.pageIndex;

export const getSortField = (state : State) => state.sortField;

export const getSortDirection = (state : State) => state.sortDirection;

export const getSearchQuery = (state : State) => state.searchQuery;

export const getCollections = (state: State) => state.collections;

export const getError = (state: State) => state.error;

export const getIsLoading = (state : State) => state.isLoading;

export const getSelectedCollection = (state : State) => state.selectedCollection;
