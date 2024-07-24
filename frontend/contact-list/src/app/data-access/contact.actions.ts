import { createAction, props } from '@ngrx/store';
import { Contact } from '../models/contact-model';

// Random User Generator Actions
export const addRandomUsers = createAction('[Contact List] Add Users')
export const addRandomUsersSuccess = createAction('[Contact List] Add Users Success', props<{ contacts: Contact[] }>());
export const addRandomUsersFailure = createAction('[Contact List] Add Users Failure', props<{ error: string }>());

// My API Actions
export const loadContacts = createAction('[Contact List] Load Contacts');
export const loadContactsSuccess = createAction('[Contact List] Load Contacts Success', props<{ contacts: Contact[] }>());
export const loadContactsFailure = createAction('[Contact List] Load Contacts Failure', props<{ error: string }>());

export const addContact = createAction('[Contact List] Add Contact', props<{ contact: Contact }>());
export const addContactSuccess = createAction('[Contact List] Add Contact Success', props<{ contact: Contact }>());
export const addContactFailure = createAction('[Contact List] Add Contact Failure', props<{ error: string }>());

export const selectContact = createAction('[Contact List] Select Contact', props<{ contact: Contact }>());
export const selectContactSuccess = createAction('[Contact List] Select Contact Success', props<{ contact: Contact }>());
export const selectContactFailure = createAction('[Contact List] Select Contact Failure', props<{ error: string }>());

export const updateContact = createAction('[Contact Details] Update Contact', props<{ contact: Contact }>());
export const updateContactSuccess = createAction('[Contact Details] Update Contact Success', props<{ contact: Contact }>());
export const updateContactFailure = createAction('[Contact Details] Update Contact Failure', props<{ error: string }>());

export const deleteContact = createAction('[Contact Details] Delete Contact', props<{ id: string }>());
export const deleteContactSuccess = createAction('[Contact Details] Delete Contact Success', props<{ id: string }>());
export const deleteContactFailure = createAction('[Contact Details] Delete Contact Failure', props<{ error: string }>());
