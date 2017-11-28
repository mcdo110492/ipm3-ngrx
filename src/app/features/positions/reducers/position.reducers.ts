import { Position } from "./../models/positions.model";
import * as positionActions from './../actions/position.actions';

export interface State {
 pageLength     : number;
 pageSize       : number;
 pageIndex      : number;
 sortField      : string;
 sortDirection  : string;
 searchQuery    : string;
 collections    : Position[];
 selectedPosition: Position; 
 error          : any;  
 isLoading      : boolean;
 isLoaded       : boolean;
}

export const initialState: State = {
    pageLength      : 0,
    pageSize        : 5,
    pageIndex       : 0,
    sortField       : 'positionName',
    sortDirection   : 'asc',
    searchQuery     : '',  
    collections     : null,
    selectedPosition : null,
    error           : null,
    isLoading       : false,
    isLoaded        : false
}


export function reducer(state: State = initialState, action: positionActions.Actions): State {
    switch (action.type) {

        case positionActions.IS_LOADING : {
            return { ...state, isLoading : action.payload };
        }

        case positionActions.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded: true};
        }

        case positionActions.LOAD_ERROR : {
            
            return { ...state, error : action.payload, isLoaded : false};
        }

        case positionActions.SEARCH : {

            return { ...state, searchQuery : action.payload};

        }

        case positionActions.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex, isLoaded : false };

        }

        case positionActions.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection, isLoaded: false };

        }

        case positionActions.SELECT_POSITION : {

            return { ...state, selectedPosition : action.payload };

        }

        case positionActions.CREATE_POSITION : {

            return { ...state, isLoaded : false };

        }

        case positionActions.UPDATE_SUCCESS : {
            
            const updatedData = state.collections.map((item) => {

                if(item.positionId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };
        }

        case positionActions.CLEAR_SELECT_POSITION : {

            return { ...state, selectedPosition : null };
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

export const getSelectedPosition = (state : State) => state.selectedPosition;

export const getIsLoaded = (state : State) => state.isLoaded;
