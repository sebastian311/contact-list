import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { NewContactFormComponent } from './new-contact-form/new-contact-form.component';

export const routes: Routes = [
    { path: '', component: ContactListComponent },
    { path: 'new-contact', component: NewContactFormComponent }
];
