import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KursusGuruComponent } from './kursus-guru.component';

describe('KursusGuruComponent', () => {
  let component: KursusGuruComponent;
  let fixture: ComponentFixture<KursusGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KursusGuruComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KursusGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
