import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriComponent } from './materi.component';

describe('MateriComponent', () => {
  let component: MateriComponent;
  let fixture: ComponentFixture<MateriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MateriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
