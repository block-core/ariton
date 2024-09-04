import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {
  layout = inject(LayoutService);

  constructor() {
    this.layout.marginOn();
  }
}
