import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalCompanyComponent } from './local-company.component';

describe('LocalCompanyComponent', () => {
  let component: LocalCompanyComponent;
  let fixture: ComponentFixture<LocalCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalCompanyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
