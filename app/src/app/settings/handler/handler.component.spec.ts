import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandlerComponent } from './handler.component';

describe('HandlerComponent', () => {
    let component: HandlerComponent;
    let fixture: ComponentFixture<HandlerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HandlerComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HandlerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
