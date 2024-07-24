import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { contactReducer } from '../contact.reducer';
import { ContactState } from '../../models/contact-model';

export interface AppState {
  state: ContactState;
}

export const reducers: ActionReducerMap<AppState> = {
  state: contactReducer
};

export const metaReducers: MetaReducer<AppState>[] = [];
