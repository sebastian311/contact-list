import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { Contact } from '../models/contact-model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/contacts`;
  private WEB_API = 'https://randomuser.me/api/?results=10';

  constructor(private http: HttpClient) {}

  // Random User Generator
  getRandomUsers(): Observable<Contact[]> {
    return this.http.get<any>(this.WEB_API).pipe(
      map((response) =>
        response.results.map((elem: any) => {
          let address: string = `${elem.location.street.name} ${elem.location.street.number}, ${elem.location.city}, ${elem.location.country}`;
          let name: string = `${elem.name.first} ${elem.name.last}`;

          return {
            id: elem.login.uuid,
            address: address,
            email: elem.email,
            phone: elem.phone,
            name: name,
            cell: elem.cell,
            registrationDate: elem.registered.date,
            age: elem.registered.age,
            image: elem.picture.thumbnail,
          } as Contact;
        })
      )
    );
  }

  saveRandomUsers(contacts: Contact[]): Observable<Contact[]> {
    const saveOperations = contacts.map(contact => this.createContact(contact));
    return forkJoin(saveOperations);
  }
  
  // My API calls

  getContacts(): Observable<Contact[]> {
    let contacts = this.http
      .get<{ contacts: Contact[] }>(this.apiUrl)
      .pipe(map((contactObj) => contactObj.contacts));

    return contacts;
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${contact.id}`, contact);
  }

  deleteContact(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
