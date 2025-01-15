import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenComponent } from './absen.component';

describe('AbsenComponent', () => {
  let component: AbsenComponent;
  let fixture: ComponentFixture<AbsenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbsenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
