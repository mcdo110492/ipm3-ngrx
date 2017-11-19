import { Projects } from "./../models/projects.model";
import * as projectActions from './../actions/project-table.actions';

export interface State {
 pageLength     : number;
 pageSize       : number;
 pageIndex      : number;
 sortField      : string;
 sortDirection  : string;
 searchQuery    : string;
 collections    : Projects[];
 selectedProject: Projects; 
 error          : any;  
 isLoading      : boolean;
 isLoaded       : boolean;
}

export const initialState: State = {
    pageLength      : 0,
    pageSize        : 5,
    pageIndex       : 0,
    sortField       : 'projectCode',
    sortDirection   : 'asc',
    searchQuery     : '',  
    collections     : null,
    selectedProject : null,
    error           : null,
    isLoading       : false,
    isLoaded        : false
}


export function reducer(state: State = initialState, action: projectActions.Actions): State {
    switch (action.type) {

        case projectActions.IS_LOADING : {

            return { ...state, isLoading : action.payload };

        }

        case projectActions.LOAD_SUCCESS : {

            return { ...state, collections : action.payload, pageLength : action.count, isLoaded : true };
        }

        case projectActions.LOAD_ERROR : {
            
            return { ...state, error : action.payload,  isLoaded : false};
        }

        case projectActions.SEARCH : {

            return { ...state, searchQuery : action.payload };

        }

        case projectActions.PAGINATE : {

            return { ...state, pageSize : action.pageSize, pageIndex : action.pageIndex };

        }

        case projectActions.SORT : {

            return { ...state, sortField : action.sortField, sortDirection : action.sortDirection };

        }

        case projectActions.SELECT_PROJECT : {

            return { ...state, selectedProject : action.payload };

        }

        case projectActions.CREATE_PROJECT : {

            return { ...state, isLoaded: false };
            
        }

        case projectActions.UPDATE_SUCCESS : {

            const updatedData = state.collections.map((item) => {

                if(item.projectId == action.payload.id){
                    return {
                        ...item,
                        ...action.payload.updatedData
                    };
                }

                return item;
            });

            return { ...state, collections: updatedData };

        }

        case projectActions.CLEAR_SELECT_PROJECT : {

            return { ...state, selectedProject : null };
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

export const getSelectedProject = (state : State) => state.selectedProject;

export const getIsLoaded = (state : State) => state.isLoaded;