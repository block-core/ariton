import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataProtocolsComponent } from './data-protocols.component';

describe('DataProtocolsComponent', () => {
  let component: DataProtocolsComponent;
  let fixture: ComponentFixture<DataProtocolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataProtocolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataProtocolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
