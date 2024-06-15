import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryComponent } from './entry.component';

describe('DataComponent', () => {
  let component: DataEntryComponent;
  let fixture: ComponentFixture<DataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
