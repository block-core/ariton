import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-handler',
    standalone: true,
    imports: [MatIconModule, MatCardModule, MatButtonModule],
    templateUrl: './handler.component.html',
    styleUrl: './handler.component.scss',
})
export class HandlerComponent {
    registerHandler(protocol: string, parameter: string) {
        // navigator.registerProtocolHandler(protocol, `./index.html?${parameter}=%s`);
        navigator.registerProtocolHandler(protocol, `/index.html?${parameter}=%s`);
    }
}
