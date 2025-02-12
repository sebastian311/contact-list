import { createReducer, on } from '@ngrx/store';
import { ContactState } from '../models/contact-model';
import * as ContactActions from './contact.actions';

export const initialState: ContactState = {
    contacts: [],
    selectedContact: null,
    error: null
};

export const contactReducer = createReducer(
  initialState,
  on(ContactActions.loadContactSuccess, (state, { contact }) => ({
    ...state,
    selectedContact: contact,
    error: null
  })),
  on(ContactActions.loadContactFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.selectContactSuccess, (state, { contact }) => ({
    ...state,
    selectedContact: contact,
    error: null
  })),
  on(ContactActions.selectContactFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.addRandomUsersSuccess, (state, { contacts }) => ({
    ...state,
    contacts: [ ...state.contacts, ...contacts],
    error: null
  })),
  on(ContactActions.addRandomUsersFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.loadContactsSuccess, (state, { contacts }) => ({
    ...state,
    contacts,
    error: null
  })),
  on(ContactActions.loadContactsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.addContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
    error: null
  })),
  on(ContactActions.addContactFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.updateContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(c => c.id === contact.id ? contact : c),
    error: null
  })),
  on(ContactActions.updateContactFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(ContactActions.deleteContactSuccess, (state, { id }) => ({
    ...state,
    contacts: state.contacts.filter(c => c.id !== id),
    error: null
  })),
  on(ContactActions.deleteContactFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

