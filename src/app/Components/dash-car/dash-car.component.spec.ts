import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCarComponent } from './dash-car.component';

describe('DashCarComponent', () => {
  let component: DashCarComponent;
  let fixture: ComponentFixture<DashCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
