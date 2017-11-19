import { Units } from "./../models/units.model";
import * as units from './../actions/units.actions';

export interface State {
 pageLength     : number;
 pageSize       : number;
 pageIndex      : number;
 sortField      : string;
 sortDirection  : string;
 searchQuery    : string;
 collections    : Units[];
 selectedUnits  : Units; 
 error          : any;  
 isLoading      : boolean;
 isLoaded       : boolean;
}

export const initialState: State = {
    pageLength      : 0,
    pageSize        : 5,
    pageIndex       : 0,
    sortField       : 'unitCode',
    sortDirection   : 'asc',
    searchQuery     : '',  
    collections     : null,
    selectedUnits   : null,
    error           : null,
    isLoading       : false,
    isLoaded        : false
}


export function reducer(state: State = initialState, action: units.Actions): State {
    switch (action.type) {

        case units.IS_LOADING : {

            return { ...state, isLoading : action.payload };

        }

        case units.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case units.LOAD_ERROR : {
            
            return { ...state, error : action.payload,  isLoaded : false};
        }

        case units.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case units.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex };

        }

        case units.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection };

        }

        case units.SELECT_UNITS : {

            return { ...state, selectedUnits : action.payload };

        }

        case units.CREATE_UNITS : {

            return {...state, isLoaded : false};

        }

        case units.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.unitId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };

        }

        case units.CLEAR_SELECT_UNITS : {

            return { ...state, selectedUnits : null };
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

export const getSelectedUnits = (state : State) => state.selectedUnits;

export const getIsLoaded = (state : State) => state.isLoaded;