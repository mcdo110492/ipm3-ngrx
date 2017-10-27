import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { Position } from "./../models/positions.model";
import  * as fromPosition from './position.reducers';
import * as fromRoot from './../../../reducers';

export interface PositionState {
    positions : fromPosition.State
}

export interface State extends fromRoot.State {
    'featurePositions' : PositionState
}


export const reducers : ActionReducerMap<PositionState> = {
    positions : fromPosition.reducer
}

export const getState = createFeatureSelector<PositionState>('featurePositions');

export const getPositionState = createSelector(getState, (state : PositionState) => state.positions);

export const getPageLength = createSelector(getPositionState, fromPosition.getPageLength);

export const getPageSize = createSelector(getPositionState, fromPosition.getPageSize);

export const getPageIndex = createSelector(getPositionState, fromPosition.getPageIndex);

export const getSortField = createSelector(getPositionState, fromPosition.getSortField);

export const getSortDirection = createSelector(getPositionState, fromPosition.getSortDirection);

export const getSearchQuery = createSelector(getPositionState , fromPosition.getSearchQuery);

export const getCollection = createSelector(getPositionState, fromPosition.getCollections);

export const getError = createSelector(getPositionState, fromPosition.getError);

export const getIsLoading = createSelector(getPositionState, fromPosition.getIsLoading);

export const getSelectedPosition = createSelector(getPositionState, fromPosition.getSelectedPosition);