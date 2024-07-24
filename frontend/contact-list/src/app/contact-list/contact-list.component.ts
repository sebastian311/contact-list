import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Contact, ContactState } from '../models/contact-model';
import { addRandomUsers, loadContacts } from '../data-access/contact.actions';
import { selectContactList } from '../data-access/contact.selectors';
import { FallbackImageDirective } from '../fallback-image.directive';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FallbackImageDirective, RouterModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent implements OnInit {
  contactList$: Observable<Contact[]>;

  constructor(private store: Store<ContactState>) {
    this.contactList$ = this.store
      .select(selectContactList)
      .pipe(map((contactList) => this.sortByName(contactList)));
  }

  ngOnInit(): void {
    this.store.dispatch(loadContacts());
  }

  sortByName(contactList: Contact[]): Contact[] {
    if (contactList.length && contactList.length > 0) {
      return [...contactList].sort((a, b) => {
        const nameA = a.name || ''; // Fallback to empty string if name is undefined
        const nameB = b.name || ''; // Fallback to empty string if name is undefined
        return nameA.localeCompare(nameB);
      });
    }
    return [];
  }

  getFirstChar(contact: Contact): string {
    if (typeof contact.name === 'string') {
      return contact.name.charAt(0);
    }
    return '';
  }

  addRandomUsers() {
    this.store.dispatch(addRandomUsers());
  }
}
