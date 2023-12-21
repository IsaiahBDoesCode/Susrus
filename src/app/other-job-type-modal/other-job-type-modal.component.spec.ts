import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherJobTypeModalComponent } from './other-job-type-modal.component';

describe('OtherJobTypeModalComponent', () => {
  let component: OtherJobTypeModalComponent;
  let fixture: ComponentFixture<OtherJobTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherJobTypeModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherJobTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
