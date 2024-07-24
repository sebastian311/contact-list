import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Contact, ContactState } from '../models/contact-model';
import { selectSelectedContact } from '../data-access/contact.selectors';
import { FallbackImageDirective } from '../fallback-image.directive';
import { deleteContact, updateContact } from '../data-access/contact.actions';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, FallbackImageDirective, ReactiveFormsModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
})
export class ContactDetailsComponent {
  editMode = false;
  newContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(''),
    phone: new FormControl(''),
    cell: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    image: new FormControl(''),
  });

  contact$: Observable<Contact | null> = this.store.select(
    selectSelectedContact
  );

  constructor(private store: Store<ContactState>, private router: Router, private cdr: ChangeDetectorRef) {}

  goBack() {
    this.router.navigateByUrl('/');
  }

  enableEdit(contact: Contact): void {
    // Update the form controls with the contact data
    this.newContactForm.patchValue({
      name: contact.name,
      age: contact.age ? contact.age.toString() : '',
      phone: contact.phone,
      cell: contact.cell,
      email: contact.email,
      address: contact.address,
      image: contact.image,
    });

    // Detect changes
    this.cdr.detectChanges();

    // Activate edit mode
    this.editMode = true;
  }

  onSubmit(contact: Contact) {
    if (this.newContactForm.valid) {
      const formValue = this.newContactForm.value;
      const newContact: Contact = {
        id: contact.id,
        name: formValue.name ?? '',
        age: formValue.age ? parseInt(formValue.age, 10) : NaN,
        phone: formValue.phone ?? '',
        cell: formValue.cell ?? '',
        email: formValue.email ?? '',
        address: formValue.address ?? '',
        image: formValue.image ?? '',
        registrationDate: new Date().toISOString(),
      };

      this.store.dispatch(updateContact({ contact: newContact }));

      this.router.navigateByUrl('/'); // go back home
    }
  }

  deleteContact(contact: Contact): void {
    this.store.dispatch(deleteContact({ id: contact.id }))
    this.router.navigateByUrl('/'); // go back home
  }
}
