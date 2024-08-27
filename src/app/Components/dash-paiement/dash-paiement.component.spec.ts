import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashPaiementComponent } from './dash-paiement.component';

describe('DashPaiementComponent', () => {
  let component: DashPaiementComponent;
  let fixture: ComponentFixture<DashPaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashPaiementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashPaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
