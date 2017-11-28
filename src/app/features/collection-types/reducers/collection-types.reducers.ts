import { CollectionTypes } from "./../models/collection-types.model";
import * as collectionTypes from './../actions/collection-types.actions';

export interface State {
 pageLength                  : number;
 pageSize                    : number;
 pageIndex                   : number;
 sortField                   : string;
 sortDirection               : string;
 searchQuery                 : string;
 collections                 : CollectionTypes[];
 SelectedCollectionType      : CollectionTypes; 
 error                       : any;  
 isLoading                   : boolean;
 isLoaded                    : boolean;
}

export const initialState: State = {
    pageLength                   : 0,
    pageSize                     : 5,
    pageIndex                    : 0,
    sortField                    : 'collectionTypeCode',
    sortDirection                : 'asc',
    searchQuery                  : '',  
    collections                  : null,
    SelectedCollectionType       : null,
    error                        : null,
    isLoading                    : false,
    isLoaded                     : false
}


export function reducer(state: State = initialState, action: collectionTypes.Actions): State {
    switch (action.type) {

        case collectionTypes.IS_LOADING : {

            return { ...state, isLoading : action.payload };

        }

        case collectionTypes.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case collectionTypes.LOAD_ERROR : {
            
            return { ...state, error : action.payload,  isLoaded : false};
        }

        case collectionTypes.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case collectionTypes.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex, isLoaded : false };

        }

        case collectionTypes.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection, isLoaded: false };

        }

        case collectionTypes.SELECT_COLLECTIONTYPES : {

            return { ...state, SelectedCollectionType : action.payload };

        }

        case collectionTypes.CREATE_COLLECTIONTYPES : {

            return {...state, isLoaded : false};

        }

        case collectionTypes.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.collectionTypeId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };

        }

        case collectionTypes.CLEAR_SELECT_COLLECTIONTYPES: {

            return { ...state, SelectedCollectionType : null };
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

export const getSelectedCollectionType = (state : State) => state.SelectedCollectionType;

export const getIsLoaded = (state : State) => state.isLoaded;