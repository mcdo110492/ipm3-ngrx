import { createSelector, createFeatureSelector, ActionReducerMap } from "@ngrx/store";
import * as fromSearch from './material-table-search.reducer';
import * as fromCollection from './material-table-collection.reducer';
import * as fromPaginate from './material-table-paginate.reducer';
import * as fromRoot from './../../../reducers';

export interface MaterialTableState {
    search      : fromSearch.State,
    collection  : fromCollection.State,
    paginate    : fromPaginate.State 
}

export interface State extends fromRoot.State {
    'elements' : MaterialTableState
}

export const reducers : ActionReducerMap<MaterialTableState> = {
    search      :   fromSearch.reducer,
    collection  :   fromCollection.reducer,
    paginate    :   fromPaginate.reducer
};


export const getElementState = createFeatureSelector<MaterialTableState>('elements');

export const getSearchState = createSelector(getElementState, (state : MaterialTableState) => state.search );

export const getSearchQuery = createSelector(getSearchState, fromSearch.getQuery);

export const getSearchLoading = createSelector(getSearchState, fromSearch.getLoading);

export const getSearchError = createSelector(getSearchState, fromSearch.getError);

export const getCollectionState = createSelector(getElementState, (state : MaterialTableState) => state.collection);

export const getCollectionElements = createSelector(getCollectionState, fromCollection.getElements);

export const getCollectionLoading = createSelector(getCollectionState,fromCollection.getLoding);

export const getSelectedCollectionId = createSelector(getCollectionState, fromCollection.getSelectedElement);
