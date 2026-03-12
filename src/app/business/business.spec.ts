import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { WebService } from '../web.service';

import { BusinessComponent } from './business';

describe('BusinessComponent', () => {
  let component: BusinessComponent;
  let fixture: ComponentFixture<BusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1'
              }
            }
          }
        },
        {
          provide: WebService,
          useValue: {
            getBusiness: () => of({
              id: 1,
              name: 'Test Business',
              address: 'Test Address',
              city: 'Test City',
              state: 'TS',
              postal_code: '12345',
              stars: 5,
              review_count: 0
            }),
            getReviews: () => of([]),
            postReview: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});