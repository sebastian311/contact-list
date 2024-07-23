import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact, ContactState } from '../models/contact-model';
import { loadContacts } from '../data-access/contact.actions';
import { selectContactList } from '../data-access/contact.selectors';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  contactList$: Observable<Contact[]>;

  constructor(private store: Store<ContactState>) {
    this.contactList$ = this.store.select(selectContactList);
  }

  ngOnInit(): void {
    this.store.dispatch(loadContacts());
  }
}
