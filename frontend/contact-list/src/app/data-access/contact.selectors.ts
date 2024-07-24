import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactState } from '../models/contact-model';

export const selectContactState = createFeatureSelector<ContactState>('contacts');

export const selectContactList = createSelector(
  selectContactState,
  (state: ContactState) => state.contacts
);

export const selectSelectedContact = createSelector(
  selectContactState,
  (state: ContactState) => state.selectedContact
);