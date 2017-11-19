import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { Equipment } from "./../models/equipments.model";
import  * as fromEquipments from './equipments.reducers';
import * as fromRoot from './../../../reducers';

export interface EquipmentsState {
    equipments : fromEquipments.State
}

export interface State extends fromRoot.State {
    'featureEquipments' : EquipmentsState
}


export const reducers : ActionReducerMap<EquipmentsState> = {
    equipments : fromEquipments.reducer
}

export const getEquipmentsState = createFeatureSelector<EquipmentsState>('featureEquipments');

export const getCollectionState = createSelector(getEquipmentsState, (state : EquipmentsState) => state.equipments);

export const getCollectionPageLength = createSelector(getCollectionState, fromEquipments.getPageLength);

export const getCollectionPageSize = createSelector(getCollectionState, fromEquipments.getPageSize);

export const getCollectionPageIndex = createSelector(getCollectionState, fromEquipments.getPageIndex);

export const getCollectionSortField = createSelector(getCollectionState, fromEquipments.getSortField);

export const getCollectionSortDirection = createSelector(getCollectionState, fromEquipments.getSortDirection);

export const getCollectionSearchQuery = createSelector(getCollectionState , fromEquipments.getSearchQuery);

export const getCollectionData = createSelector(getCollectionState, fromEquipments.getCollections);

export const getCollectionError = createSelector(getCollectionState, fromEquipments.getError);

export const getCollectionIsLoading = createSelector(getCollectionState, fromEquipments.getIsLoading);

export const getCollectionSelectedEquipment = createSelector(getCollectionState, fromEquipments.getSelectedEquipment);

export const getCollectionIsLoaded = createSelector(getCollectionState, fromEquipments.getIsLoaded);