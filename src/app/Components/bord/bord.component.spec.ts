import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordComponent } from './bord.component';

describe('BordComponent', () => {
  let component: BordComponent;
  let fixture: ComponentFixture<BordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
