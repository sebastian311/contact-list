import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';

import * as uuid from 'uuid';

import { Contact, ContactState } from '../models/contact-model';
import { addContact } from '../data-access/contact.actions';

@Component({
  selector: 'app-new-contact-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './new-contact-form.component.html',
  styleUrl: './new-contact-form.component.scss',
})
export class NewContactFormComponent {
  newContactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl(''),
    phone: new FormControl(''),
    cell: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
    image: new FormControl(''),
  });

  constructor(private store: Store<ContactState>, private router: Router) {}

  onSubmit() {
    if (this.newContactForm.valid) {
      const formValue = this.newContactForm.value;
      const newContact: Contact = {
        id: uuid.v4(),
        name: formValue.name ?? '',
        age: formValue.age ? parseInt(formValue.age, 10) : NaN,
        phone: formValue.phone ?? '',
        cell: formValue.cell ?? '',
        email: formValue.email ?? '',
        address: formValue.address ?? '',
        image: formValue.image ?? '',
        registrationDate: new Date().toISOString()
      };
      this.store.dispatch(addContact({ contact: newContact }));

      this.router.navigateByUrl('/'); // go back home
    }
  }

  goBack() {
    this.router.navigateByUrl('/'); // go back home
  }
}
