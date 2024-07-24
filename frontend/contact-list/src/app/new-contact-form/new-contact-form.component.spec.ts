import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NewContactFormComponent } from './new-contact-form.component';
import { ContactState } from '../models/contact-model';

describe('NewContactFormComponent', () => {
  let component: NewContactFormComponent;
  let fixture: ComponentFixture<NewContactFormComponent>;
  let store: MockStore<ContactState>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NewContactFormComponent,
        ReactiveFormsModule,
        RouterTestingModule,
      ],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NewContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
