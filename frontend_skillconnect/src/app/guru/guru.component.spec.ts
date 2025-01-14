import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuruComponent } from './guru.component';

describe('GuruComponent', () => {
  let component: GuruComponent;
  let fixture: ComponentFixture<GuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuruComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
