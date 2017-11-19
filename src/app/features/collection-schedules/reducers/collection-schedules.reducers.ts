import { CollectionSchedules } from "./../models/collection-schedules.model";
import * as collectionSchedule from './../actions/collection-schedules.actions';

export interface State {
 pageLength                  : number;
 pageSize                    : number;
 pageIndex                   : number;
 sortField                   : string;
 sortDirection               : string;
 searchQuery                 : string;
 collections                 : CollectionSchedules[];
 selectedCollectionSchedule  : CollectionSchedules; 
 error                       : any;  
 isLoading                   : boolean;
 isLoaded                    : boolean;
}

export const initialState: State = {
    pageLength                   : 0,
    pageSize                     : 5,
    pageIndex                    : 0,
    sortField                    : 'collectionScheduleCode',
    sortDirection                : 'asc',
    searchQuery                  : '',  
    collections                  : null,
    selectedCollectionSchedule   : null,
    error                        : null,
    isLoading                    : false,
    isLoaded                     : false
}


export function reducer(state: State = initialState, action: collectionSchedule.Actions): State {
    switch (action.type) {

        case collectionSchedule.IS_LOADING : {

            return { ...state, isLoading : action.payload };

        }

        case collectionSchedule.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case collectionSchedule.LOAD_ERROR : {
            
            return { ...state, error : action.payload,  isLoaded : false};
        }

        case collectionSchedule.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case collectionSchedule.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex };

        }

        case collectionSchedule.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection };

        }

        case collectionSchedule.SELECT_COLLECTIONSCHEDULES : {

            return { ...state, selectedCollectionSchedule : action.payload };

        }

        case collectionSchedule.CREATE_COLLECTIONSCHEDULES : {

            return {...state, isLoaded : false};

        }

        case collectionSchedule.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.collectionScheduleId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };

        }

        case collectionSchedule.CLEAR_SELECT_COLLECTIONSCHEDULES: {

            return { ...state, selectedCollectionSchedule : null };
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

export const getSelectedCollectionSchedule = (state : State) => state.selectedCollectionSchedule;

export const getIsLoaded = (state : State) => state.isLoaded;