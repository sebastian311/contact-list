import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactState } from '../models/contact-model';
import { ReactiveFormsModule } from '@angular/forms';
import { FallbackImageDirective } from '../fallback-image.directive';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let store: MockStore<ContactState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactDetailsComponent,
        ReactiveFormsModule,
        RouterTestingModule,
        FallbackImageDirective
      ],
      providers: [provideMockStore()]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
