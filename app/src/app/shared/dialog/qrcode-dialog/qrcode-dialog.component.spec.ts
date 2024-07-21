import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QRCodeDialogComponent } from './qrcode-dialog.component';

describe('QRCodeDialogComponent', () => {
  let component: QRCodeDialogComponent;
  let fixture: ComponentFixture<QRCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QRCodeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QRCodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
