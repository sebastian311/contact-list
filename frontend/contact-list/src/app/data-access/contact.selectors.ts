import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactState } from './contact.reducer';

export const selectContactState = createFeatureSelector<ContactState>('contacts');

export const selectContactList = createSelector(
  selectContactState,
  (state: ContactState) => state.contacts
);
