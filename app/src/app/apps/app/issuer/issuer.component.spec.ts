import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuerComponent } from './issuer.component';

describe('VoluntaryistCovenantComponent', () => {
  let component: IssuerComponent;
  let fixture: ComponentFixture<IssuerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IssuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
