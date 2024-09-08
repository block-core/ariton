import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberstadLandComponent } from './liberstad-land.component';

describe('LiberstadLandComponent', () => {
  let component: LiberstadLandComponent;
  let fixture: ComponentFixture<LiberstadLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiberstadLandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiberstadLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
