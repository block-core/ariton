import { Component, model } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { LayoutService } from "../../../layout.service";
import { OnDestroy } from '@angular/core';


@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [ FormsModule, 
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatButtonToggleModule,
        MatFormFieldModule, ReactiveFormsModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnDestroy{
    viewStyle = model<string>('card');

    constructor(public layout: LayoutService) {
        this.layout.disableScrolling();
    }

    ngOnDestroy() {
        this.layout.enableScrolling();
    }
}