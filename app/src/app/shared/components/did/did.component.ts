import { Component, HostListener, input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DidPipe } from '../../pipes/did.pipe';

@Component({
  selector: 'app-did',
  standalone: true,
  imports: [MatTooltipModule, DidPipe],
  templateUrl: './did.component.html',
  styleUrl: './did.component.scss',
})
export class DidComponent {
  did = input.required<string>();

  @HostListener('click', ['$event'])
  async onClick(e: any) {
    console.log(e);

    try {
      await navigator.clipboard.writeText(this.did());
      console.log('Text copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
}
