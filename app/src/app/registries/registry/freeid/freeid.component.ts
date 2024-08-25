import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../layout.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-freeid',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './freeid.component.html',
  styleUrl: './freeid.component.scss',
})
export class FreeIDComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOn();
  }

  apply() {}
}
