import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrcodeScanDialogComponent } from './qrcode-scan-dialog.component';

describe('QrcodeScanDialogComponent', () => {
  let component: QrcodeScanDialogComponent;
  let fixture: ComponentFixture<QrcodeScanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrcodeScanDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrcodeScanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
