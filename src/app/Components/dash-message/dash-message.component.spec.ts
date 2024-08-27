import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashMessageComponent } from './dash-message.component';

describe('DashMessageComponent', () => {
  let component: DashMessageComponent;
  let fixture: ComponentFixture<DashMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
