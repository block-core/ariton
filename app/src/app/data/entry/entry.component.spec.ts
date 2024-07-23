import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryComponent } from './entry.component';
import { JsonPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { provideRouter, RouterModule } from '@angular/router';

describe('DataEntryComponent', () => {
  let component: DataEntryComponent;
  let fixture: ComponentFixture<DataEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataEntryComponent, JsonPipe, CommonModule, MatButtonModule, MatIconModule, RouterModule],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DataEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
