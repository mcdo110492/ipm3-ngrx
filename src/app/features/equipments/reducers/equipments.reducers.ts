import { Equipment } from "./../models/equipments.model";
import * as equipments from './../actions/equipments.actions';

export interface State {
 pageLength                  : number;
 pageSize                    : number;
 pageIndex                   : number;
 sortField                   : string;
 sortDirection               : string;
 searchQuery                 : string;
 collections                 : Equipment[];
 selectedEquipment           : Equipment; 
 error                       : any;  
 isLoading                   : boolean;
 isLoaded                    : boolean;
}

export const initialState: State = {
    pageLength                   : 0,
    pageSize                     : 5,
    pageIndex                    : 0,
    sortField                    : 'equipmentCode',
    sortDirection                : 'asc',
    searchQuery                  : '',  
    collections                  : null,
    selectedEquipment            : null,
    error                        : null,
    isLoading                    : false,
    isLoaded                     : false
}


export function reducer(state: State = initialState, action: equipments.Actions): State {
    switch (action.type) {

        case equipments.IS_LOADING : {

            return { ...state, isLoading : action.payload };

        }

        case equipments.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case equipments.LOAD_ERROR : {
            
            return { ...state, error : action.payload,  isLoaded : false};
        }

        case equipments.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case equipments.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex, isLoaded : false };

        }

        case equipments.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection, isLoaded : false };

        }

        case equipments.SELECT_EQUIPMENTS : {

            return { ...state, selectedEquipment : action.payload };

        }

        case equipments.CREATE_EQUIPMENTS : {

            return {...state, isLoaded : false};

        }

        case equipments.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.equipmentId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };

        }

        case equipments.CLEAR_SELECT_EQUIPMENTS: {

            return { ...state, selectedEquipment : null };
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

export const getSelectedEquipment = (state : State) => state.selectedEquipment;

export const getIsLoaded = (state : State) => state.isLoaded;