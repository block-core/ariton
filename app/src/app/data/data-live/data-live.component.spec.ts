import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataLiveComponent } from './data-live.component';

describe('DataLiveComponent', () => {
  let component: DataLiveComponent;
  let fixture: ComponentFixture<DataLiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataLiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
