import { EmploymentStatus } from "./../models/employment-status.model";
import * as employmentStatusActions from './../actions/employment-status.actions';

export interface State {
 pageLength                     : number;
 pageSize                       : number;
 pageIndex                      : number;
 sortField                      : string;
 sortDirection                  : string;
 searchQuery                    : string;
 collections                    : EmploymentStatus[];
 selectedEmploymentStatus       : EmploymentStatus; 
 error                          : any;  
 isLoading                      : boolean;
 isLoaded                       : boolean;
}

export const initialState: State = {
    pageLength                  : 0,
    pageSize                    : 5,
    pageIndex                   : 0,
    sortField                   : 'employmentStatusName',
    sortDirection               : 'asc',
    searchQuery                 : '',  
    collections                 : null,
    selectedEmploymentStatus    : null,
    error                       : null,
    isLoading                   : false,
    isLoaded                    : false
}


export function reducer(state: State = initialState, action: employmentStatusActions.Actions): State {
    switch (action.type) {

        case employmentStatusActions.IS_LOADING : {
            return { ...state, isLoading : action.payload };
        }

        case employmentStatusActions.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case employmentStatusActions.LOAD_ERROR : {
            
            return { ...state, error : action.payload, isLoaded: false};
        }

        case employmentStatusActions.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case employmentStatusActions.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex };

        }

        case employmentStatusActions.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection };

        }

        case employmentStatusActions.SELECT_EMPLOYMENT_STATUS : {

            return { ...state, selectedEmploymentStatus : action.payload };

        }

        case employmentStatusActions.CREATE_EMPLOYMENT_STATUS : {

            return { ...state, isLoaded : false };

        }

        case employmentStatusActions.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {
                if(item.employmentStatusId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };
        }

        case employmentStatusActions.CLEAR_SELECT_EMPLOYMENT_STATUS : {

            return { ...state, selectedEmploymentStatus : null };
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

export const getSelectedEmploymentStatus = (state : State) => state.selectedEmploymentStatus;

export const getIsLoaded = (state : State) => state.isLoaded;
