import { Shifts } from "./../models/shifts.model";
import * as shifts from './../actions/shifts.actions';

export interface State {
 pageLength                  : number;
 pageSize                    : number;
 pageIndex                   : number;
 sortField                   : string;
 sortDirection               : string;
 searchQuery                 : string;
 collections                 : Shifts[];
 selectedShift               : Shifts; 
 error                       : any;  
 isLoading                   : boolean;
 isLoaded                    : boolean;
}

export const initialState: State = {
    pageLength                   : 0,
    pageSize                     : 5,
    pageIndex                    : 0,
    sortField                    : 'bodyNumber',
    sortDirection                : 'asc',
    searchQuery                  : '',  
    collections                  : null,
    selectedShift                : null,
    error                        : null,
    isLoading                    : false,
    isLoaded                     : false
}


export function reducer(state: State = initialState, action: shifts.Actions): State {
    switch (action.type) {

        case shifts.IS_LOADING : {

            return { ...state, isLoading : action.payload };

        }

        case shifts.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case shifts.LOAD_ERROR : {
            
            return { ...state, error : action.payload,  isLoaded : false};
        }

        case shifts.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case shifts.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex, isLoaded : false };

        }

        case shifts.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection, isLoaded : false };

        }

        case shifts.SELECT_SHIFTS : {

            return { ...state, selectedShift : action.payload };

        }

        case shifts.CREATE_SHIFTS : {

            return {...state, isLoaded : false};

        }

        case shifts.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.shiftId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };

        }

        case shifts.CLEAR_SELECT_SHIFTS: {

            return { ...state, selectedShift : null };
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

export const getSelectedShift = (state : State) => state.selectedShift;

export const getIsLoaded = (state : State) => state.isLoaded;