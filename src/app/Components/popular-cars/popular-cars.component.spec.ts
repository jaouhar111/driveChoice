import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularCarsComponent } from './popular-cars.component';

describe('PopularCarsComponent', () => {
  let component: PopularCarsComponent;
  let fixture: ComponentFixture<PopularCarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopularCarsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopularCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
