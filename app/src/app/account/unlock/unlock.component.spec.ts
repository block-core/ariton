import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockComponent } from './unlock.component';

describe('UnlockComponent', () => {
  let component: UnlockComponent;
  let fixture: ComponentFixture<UnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnlockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
