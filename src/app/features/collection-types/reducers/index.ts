import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { CollectionTypes } from "./../models/collection-types.model";
import  * as fromCollectionTypes from './collection-types.reducers';
import * as fromRoot from './../../../reducers';

export interface CollectionTypesState {
    collectionTypes : fromCollectionTypes.State
}

export interface State extends fromRoot.State {
    'featureCollectionTypes' : CollectionTypesState
}


export const reducers : ActionReducerMap<CollectionTypesState> = {
    collectionTypes : fromCollectionTypes.reducer
}

export const getCollectionTypessState = createFeatureSelector<CollectionTypesState>('featureCollectionTypes');

export const getCollectionState = createSelector(getCollectionTypessState, (state : CollectionTypesState) => state.collectionTypes);

export const getCollectionPageLength = createSelector(getCollectionState, fromCollectionTypes.getPageLength);

export const getCollectionPageSize = createSelector(getCollectionState, fromCollectionTypes.getPageSize);

export const getCollectionPageIndex = createSelector(getCollectionState, fromCollectionTypes.getPageIndex);

export const getCollectionSortField = createSelector(getCollectionState, fromCollectionTypes.getSortField);

export const getCollectionSortDirection = createSelector(getCollectionState, fromCollectionTypes.getSortDirection);

export const getCollectionSearchQuery = createSelector(getCollectionState , fromCollectionTypes.getSearchQuery);

export const getCollectionData = createSelector(getCollectionState, fromCollectionTypes.getCollections);

export const getCollectionError = createSelector(getCollectionState, fromCollectionTypes.getError);

export const getCollectionIsLoading = createSelector(getCollectionState, fromCollectionTypes.getIsLoading);

export const getCollectionSelectedCollectionType = createSelector(getCollectionState, fromCollectionTypes.getSelectedCollectionType);

export const getCollectionIsLoaded = createSelector(getCollectionState, fromCollectionTypes.getIsLoaded);