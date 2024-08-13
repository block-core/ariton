import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [MatDividerModule],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss',
})
export class HelpComponent {}
