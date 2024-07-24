import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactListComponent } from './contact-list.component';
import { loadContacts } from '../data-access/contact.actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Contact } from '../models/contact-model';
import { RouterTestingModule } from '@angular/router/testing';
import { ElementRef } from '@angular/core';
import { FallbackImageDirective } from '../fallback-image.directive';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let store: MockStore;
  const initialState = { contacts: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent, RouterTestingModule],  // Import standalone component and RouterTestingModule
      providers: [provideMockStore({ initialState })]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should dispatch loadContacts action on ngOnInit', () => {
    const spy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(loadContacts());
  });

  it('should sort contact list by name in sortByName method', () => {
    const contactList: Contact[] = [
      {
        id: '1', name: 'Charlie',
        address: '',
        email: '',
        phone: '',
        cell: '',
        registrationDate: '',
        age: 0,
        image: ''
      },
      {
        id: '2', name: 'Alice',
        address: '',
        email: '',
        phone: '',
        cell: '',
        registrationDate: '',
        age: 0,
        image: ''
      },
      {
        id: '3', name: 'Bob',
        address: '',
        email: '',
        phone: '',
        cell: '',
        registrationDate: '',
        age: 0,
        image: ''
      }
    ];
    const sortedList = component.sortByName(contactList);
    expect(sortedList).toEqual([
      {
        id: '2', name: 'Alice',
        address: '',
        email: '',
        phone: '',
        cell: '',
        registrationDate: '',
        age: 0,
        image: ''
      },
      {
        id: '3', name: 'Bob',
        address: '',
        email: '',
        phone: '',
        cell: '',
        registrationDate: '',
        age: 0,
        image: ''
      },
      {
        id: '1', name: 'Charlie',
        address: '',
        email: '',
        phone: '',
        cell: '',
        registrationDate: '',
        age: 0,
        image: ''
      }
    ]);
  });

  describe('FallbackImageDirective', () => {
    let elementRef: ElementRef;
    let directive: FallbackImageDirective;

    beforeEach(() => {
      elementRef = new ElementRef(document.createElement('img'));
      directive = new FallbackImageDirective(elementRef);
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should set fallback image on error', () => {
      const fallbackUrl = 'assets/user-profile-icon-free-vector.jpg';
      directive.appImgFallback = fallbackUrl;

      directive.loadFallbackImageOnError();

      expect((elementRef.nativeElement as HTMLImageElement).src).toContain(fallbackUrl);
    });
  });
});
