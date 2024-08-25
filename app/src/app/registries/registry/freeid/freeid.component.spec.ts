import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeIDComponent } from './freeid.component';

describe('FreeidComponent', () => {
  let component: FreeIDComponent;
  let fixture: ComponentFixture<FreeIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeIDComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FreeIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
