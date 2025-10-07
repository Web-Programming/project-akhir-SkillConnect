import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriGuruComponent } from './materi-guru.component';

describe('MateriGuruComponent', () => {
  let component: MateriGuruComponent;
  let fixture: ComponentFixture<MateriGuruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriGuruComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriGuruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
