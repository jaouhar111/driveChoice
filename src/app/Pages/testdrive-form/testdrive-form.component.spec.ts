import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdriveFormComponent } from './testdrive-form.component';

describe('TestdriveFormComponent', () => {
  let component: TestdriveFormComponent;
  let fixture: ComponentFixture<TestdriveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestdriveFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestdriveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
