import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ContactService } from './contact.service';
import * as ContactActions from './contact.actions';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ContactEffects {
  constructor(
    private actions$: Actions,
    private contactService: ContactService
  ) {}

  // Random User Generator Effect
  addRandomUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.addRandomUsers),
      switchMap(() =>
        this.contactService.getRandomUsers().pipe(
          switchMap(contacts => 
            this.contactService.saveRandomUsers(contacts).pipe(
              switchMap(savedContacts => [
                ContactActions.addRandomUsersSuccess({ contacts: savedContacts }),
                ContactActions.loadContacts()  // Dispatch loadContacts after success
              ]),
              catchError(error => of(ContactActions.addRandomUsersFailure({ error: error.message })))
            )
          ),
          catchError(error => of(ContactActions.addRandomUsersFailure({ error: error.message })))
        )
      )
    )
  );

  // My API effects
  loadContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.loadContact),
      mergeMap(action =>
        this.contactService.getContactById(action.id).pipe(
          map(contact => ContactActions.loadContactSuccess({ contact })),
          catchError(error => of(ContactActions.loadContactFailure({ error: error.message })))
        )
      )
    )
  );
  loadContacts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.loadContacts),
      switchMap(() =>
        this.contactService.getContacts().pipe(
          map(contacts => ContactActions.loadContactsSuccess({ contacts })),
          catchError(error => of(ContactActions.loadContactsFailure({ error: error.message })))
        )
      )
    )
  );

  addContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.addContact),
      mergeMap(action =>
        this.contactService.createContact(action.contact).pipe(
          map(contact => ContactActions.addContactSuccess({ contact })),
          catchError(error => of(ContactActions.addContactFailure({ error: error.message })))
        )
      )
    )
  );

  updateContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.updateContact),
      mergeMap(action =>
        this.contactService.updateContact(action.contact).pipe(
          map(contact => ContactActions.updateContactSuccess({ contact })),
          catchError(error => of(ContactActions.updateContactFailure({ error: error.message })))
        )
      )
    )
  );

  deleteContact$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactActions.deleteContact),
      mergeMap(action =>
        this.contactService.deleteContact(action.id).pipe(
          map(() => ContactActions.deleteContactSuccess({ id: action.id })),
          catchError(error => of(ContactActions.deleteContactFailure({ error: error.message })))
        )
      )
    )
  );
}
