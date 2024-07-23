import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';

import { reducers, metaReducers } from './data-access/reducers/index';
import { ContactEffects } from './data-access/contact.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(reducers, { metaReducers }), importProvidersFrom(HttpClientModule), provideEffects([ContactEffects])]
};
