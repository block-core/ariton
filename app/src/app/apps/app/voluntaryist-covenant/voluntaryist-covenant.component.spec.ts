import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryistCovenantComponent } from './voluntaryist-covenant.component';

describe('VoluntaryistCovenantComponent', () => {
  let component: VoluntaryistCovenantComponent;
  let fixture: ComponentFixture<VoluntaryistCovenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoluntaryistCovenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoluntaryistCovenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
