import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCollectionComponent } from './car-collection.component';

describe('CarCollectionComponent', () => {
  let component: CarCollectionComponent;
  let fixture: ComponentFixture<CarCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
