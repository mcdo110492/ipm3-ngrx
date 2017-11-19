import { createFeatureSelector, createSelector, ActionReducerMap } from "@ngrx/store";
import { Projects } from "./../models/projects.model";
import  * as fromProjects from './projects-table.reducers';
import * as fromRoot from './../../../reducers';

export interface ProjectState {
    projects : fromProjects.State
}

export interface State extends fromRoot.State {
    'featureProjects' : ProjectState
}


export const reducers : ActionReducerMap<ProjectState> = {
    projects : fromProjects.reducer
}

export const getProjectState = createFeatureSelector<ProjectState>('featureProjects');

export const getCollectionState = createSelector(getProjectState, (state : ProjectState) => state.projects);

export const getCollectionPageLength = createSelector(getCollectionState, fromProjects.getPageLength);

export const getCollectionPageSize = createSelector(getCollectionState, fromProjects.getPageSize);

export const getCollectionPageIndex = createSelector(getCollectionState, fromProjects.getPageIndex);

export const getCollectionSortField = createSelector(getCollectionState, fromProjects.getSortField);

export const getCollectionSortDirection = createSelector(getCollectionState, fromProjects.getSortDirection);

export const getCollectionSearchQuery = createSelector(getCollectionState , fromProjects.getSearchQuery);

export const getCollectionData = createSelector(getCollectionState, fromProjects.getCollections);

export const getCollectionError = createSelector(getCollectionState, fromProjects.getError);

export const getCollectionIsLoading = createSelector(getCollectionState, fromProjects.getIsLoading);

export const getCollectionSelectedProject = createSelector(getCollectionState, fromProjects.getSelectedProject);

export const getCollectionIsLoaded = createSelector(getCollectionState, fromProjects.getIsLoaded);