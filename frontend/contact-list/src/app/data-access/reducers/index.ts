import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { contactReducer } from '../contact.reducer';
import { ContactState } from '../../models/contact-model';

export interface AppState {
  contacts: ContactState;
}

export const reducers: ActionReducerMap<AppState> = {
  contacts: contactReducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
