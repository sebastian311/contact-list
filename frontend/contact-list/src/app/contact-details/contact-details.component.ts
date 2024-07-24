import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact, ContactState } from '../models/contact-model';
import { selectSelectedContact } from '../data-access/contact.selectors';
import { FallbackImageDirective } from '../fallback-image.directive';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule, FallbackImageDirective],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss'
})
export class ContactDetailsComponent {
  contact$: Observable<Contact | null>;
  
  constructor(private store: Store<ContactState>, private router: Router) {
    this.contact$ = this.store.select(selectSelectedContact);
  }

  goBack() {
    this.router.navigateByUrl('/')
  }
}
