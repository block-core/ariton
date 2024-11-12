import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NostrComponent } from './nostr.component';

describe('NostrComponent', () => {
  let component: NostrComponent;
  let fixture: ComponentFixture<NostrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NostrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NostrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
