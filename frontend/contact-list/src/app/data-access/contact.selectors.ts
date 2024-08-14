import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactState } from '../models/contact-model';
import { AppState } from './reducers';

export const selectContactState = (appState: AppState) => appState.state;

export const selectContactList = createSelector(
  selectContactState,
  (state: ContactState) => state.contacts
);

export const selectSelectedContact = createSelector(
  selectContactState,
  (state: ContactState) => state.selectedContact
);